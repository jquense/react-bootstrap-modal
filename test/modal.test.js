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

    expect(dom.contains(document.body, document.getElementById('test')))
      .toEqual(false)

    mount(<Modal id='test' show/>);

    expect(dom.contains(document.body, document.getElementById('test')))
      .toEqual(true)
  })


  it('should render backdrop', () => {
    inst = mount(<Modal id='test' show/>);

    expect(qsa('.modal-backdrop').length).toEqual(1)
  })

  it('should leave out backdrop', () => {
    inst = mount(<Modal id='test' backdrop={false}/>);

    expect(qsa('.modal-backdrop').length).toEqual(0)
  })

  it('should trigger close on backdrop click', done => {
    inst = mount(<Modal id='test' show onHide={()=> done()}/>);

    inst.instance().backdrop.click()
  })

  it('should not trigger close on static backdrop click', () => {
    let err = ()=> { throw new Error('should not trigger onHide')}

    inst = mount(<Modal backdrop='static' show onHide={err}/>);

    inst.instance().backdrop.click()
  })

  it('should trigger close on backdrop click', done => {
    inst = mount(<Modal show onHide={()=> done() }/>);

    inst.instance().backdrop.click()
  })


  describe('Header', ()=> {

    it('should include a close button', () => {
      inst = mount(<Modal.Header closeButton>{'title'}</Modal.Header>)

      expect(inst.find('button.close').length).toEqual(1)
    })

    it('should trigger onHide in parent', done => {
      inst = mount(
        <Modal show backdrop='static' onHide={()=> done() }>
          <Modal.Header closeButton />
        </Modal>
      )

      inst.instance().dialog.querySelector('.close').click()
    })
  })

  describe('Dismiss', ()=> {

    it('should trigger onHide in parent', done => {
      inst = mount(
        <Modal show backdrop='static' onHide={()=> done() }>
          <div><Modal.Dismiss className='close-btn'/></div>
        </Modal>
      )

      inst.instance().dialog.querySelector('.close-btn').click()
    })

    it('should use the `component` prop', () => {
      let Button = ()=> <a>{'hi'}</a>

      inst = shallow(<Modal.Dismiss component='span'/>);

      expect(inst.type()).toEqual('span')

      inst = shallow(<Modal.Dismiss component={Button}/>);

      expect(inst.type()).toEqual(Button)
    })
  })
})
