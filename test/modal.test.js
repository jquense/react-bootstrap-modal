import dom from 'dom-helpers';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import simulant from 'simulant';


import Modal from '../src/Modal';
Enzyme.configure({ adapter: new Adapter() })

var qsa = document.querySelectorAll.bind(document)


describe('Modal', () => {
  let inst;

  afterEach(()=> {
    //clear out old values
    inst && inst.unmount && inst.unmount()
    document.body.innerHTML = ''
  })

  it('should render into the DOM', () => {
    inst = mount(<Modal id='test'/>);

    dom.contains(document.body, document.getElementById('test'))
      .should.equal(false)

    mount(<Modal id='test' show/>);

    dom.contains(document.body, document.getElementById('test'))
      .should.equal(true)
  })


  it('should render backdrop', () => {
    inst = mount(<Modal id='test' show/>);

    qsa('.modal-backdrop').length.should.equal(1)
  })

  it('should leave out backdrop', () => {
    inst = mount(<Modal id='test' backdrop={false}/>);

    qsa('.modal-backdrop').length.should.equal(0)
  })

  it('should trigger close on backdrop click', done => {
    inst = mount(<Modal id='test' show onHide={()=> done()}/>);

    mount(inst[0].backdrop).trigger('click')
  })

  it('should not trigger close on static backdrop click', () => {
    let err = ()=> { throw new Error('should not trigger onHide')}

    inst = mount(<Modal backdrop='static' show onHide={err}/>);

    mount(inst[0].backdrop).trigger('click')
  })

  it('should trigger close on backdrop click', done => {
    inst = mount(<Modal show onHide={()=> done() }/>);

    mount(inst[0].backdrop).trigger('click')
  })

  it('should trigger close on ESC', done => {
    inst = mount(<Modal show onHide={()=> done() }/>);

    simulant.fire(qsa('.modal')[0], 'keyup', { keyCode: 27 })
  })

  it('should not trigger close on ESC when keyboard is false', () => {
    let err = ()=> { throw new Error('should not trigger onHide')}

    inst = mount(<Modal show keyboard={false} onHide={err}/>);

    simulant.fire(qsa('.modal')[0], 'keyup', { keyCode: 27 })
  })

  describe('Header', ()=> {

    it('should include a close button', () => {
      inst = mount(<Modal.Header closeButton>{'title'}</Modal.Header>)

      inst.find('.close:dom').single()
    })

    it('should trigger onHide in parent', done => {
      inst = mount(
        <Modal show backdrop='static' onHide={()=> done() }>
          <Modal.Header closeButton />
        </Modal>
      )

      mount(inst[0].dialog).find('.close').trigger('click')
    })
  })

  describe('Dismiss', ()=> {

    it('should trigger onHide in parent', done => {
      inst = mount(
        <Modal show backdrop='static' onHide={()=> done() }>
          <div><Modal.Dismiss className='close-btn'/></div>
        </Modal>
      )

      mount(inst[0].dialog).find('.close-btn').trigger('click')
    })

    it('should use the `component` prop', () => {
      let Button = ()=> <a>{'hi'}</a>

      inst = shallow(<Modal.Dismiss component='span'/>);

      inst.children()[0].type.should.equal('span')

      inst = shallow(<Modal.Dismiss component={Button}/>);

      inst.children()[0].type.should.equal(Button)
    })
  })
})
