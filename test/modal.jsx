
var React = require('react/addons');
var Modal = require('../src/Modal');
var $ = require('dom-helpers')
var simulant = require('simulant')

var qsa = document.querySelectorAll.bind(document)

//console.log(sinon)
var TestUtils = React.addons.TestUtils
  , render = TestUtils.renderIntoDocument
  , findClass = TestUtils.findRenderedDOMComponentWithClass
  , trigger = TestUtils.Simulate;

describe('Modal', () => {

  afterEach(()=> {
    //clear out old values
    document.body.innerHTML = ''
  })

  it('should render into the DOM', () => {
    render(<Modal id='test'/>);

    $.contains(document.body, document.getElementById('test'))
      .should.equal(false)

    render(<Modal id='test' show/>);

    $.contains(document.body, document.getElementById('test'))
      .should.equal(true)
  })

  // it('should respect prefix', () => {
  //   Modal.injectCssPrefix('rw-modal')

  //   render(
  //     <Modal id='test' show>
  //       <Modal.Header><Modal.Title>hi</Modal.title></Modal.Header>
  //       <Modal.Body>body</Modal.Body>
  //       <Modal.Footer>foot</Modal.Footer>
  //     </Modal>
  //   );

  //   qsa('.modal-backdrop').length.should.equal(1)
  // })


  it('should render backdrop', () => {
    render(<Modal id='test' show/>);

    qsa('.modal-backdrop').length.should.equal(1)
  })

  it('should leave out backdrop', () => {
    render(<Modal id='test' backdrop={false}/>);

    qsa('.modal-backdrop').length.should.equal(0)
  })

  it('should trigger close on backdrop click', done => {
    render(<Modal id='test' show onHide={()=> done() }/>);

    trigger.click(qsa('.modal-backdrop')[0])
  })

  it('should not trigger close on static backdrop click', () => {
    render(<Modal backdrop='static' show onHide={()=> { throw new Error('should not trigger onHide')}}/>);

    trigger.click(qsa('.modal-backdrop')[0])
  })

  it('should trigger close on backdrop click', done => {
    render(<Modal show onHide={()=> done() }/>);

    trigger.click(qsa('.modal-backdrop')[0])
  })

  it('should trigger close on ESC', done => {
    render(<Modal show onHide={()=> done() }/>);

    simulant.fire(qsa('.modal')[0], 'keyup', { keyCode: 27 })
  })

  it('should not trigger close on ESC when keyboard is false', () => {
    render(<Modal show keyboard={false} onHide={()=> {throw new Error('should not trigger onHide')}}/>);

    simulant.fire(qsa('.modal')[0], 'keyup', { keyCode: 27 })
  })

  it('should not trigger close on ESC when backdrop is static', () => {
    render(<Modal show backdrop='static' onHide={()=> {throw new Error('should not trigger onHide')}}/>);

    simulant.fire(qsa('.modal')[0], 'keyup', { keyCode: 27 })
  })

  describe('Header', ()=> {

    it('should include a close button', () => {
      var inst = render(<Modal.Header closeButton>{'title'}</Modal.Header>)

      findClass(inst, 'close')
    })

    it('should trigger onHide in parent', done => {
      render(
        <Modal show backdrop='static' onHide={()=> done() }>
          <Modal.Header closeButton />
        </Modal>
      )

      trigger.click(qsa('.close')[0])
    })
  })

  describe('Dismiss', ()=> {

    it('should trigger onHide in parent', done => {
      render(
        <Modal show backdrop='static' onHide={()=> done() }>
          <div><Modal.Dismiss className='close-btn'/></div>
        </Modal>
      )

      trigger.click(qsa('.close-btn')[0])
    })

    it('should use the `component` prop', () => {

      class Button extends React.Component {
        render(){ return <a>{'hi'}</a> }
      }

      var inst = render(<Modal.Dismiss component='span'/>);

      React.findDOMNode(inst).tagName.should.equal('SPAN')

      inst = render(<Modal.Dismiss component={Button}/>)

      React.findDOMNode(inst).tagName.should.equal('A')
    })
  })
})
