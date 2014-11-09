'use strict';

require('../src/less/bbm-complete.less')

var React = require('react/addons')
  , Modal = require('../src/components/Modal.jsx')
  , ModalTrigger = require('../src/components/ModalTrigger')
  , Layer = require('../src/Layer')


function alert(message, callback) {

  var layer = new Layer(document.body, function(){

    return (
      <Modal show={true} onRequestHide={finish} backdrop='static'>
        <div className="modal-body">
            <h4>{message}</h4>
        </div>
        <div className="modal-footer">
            <button onClick={finish}>Close</button>
        </div>
      </Modal>)

    function finish(){
      callback()
      setTimeout(function(){ 
        layer.destroy() 
      })
    }
  })

  layer.render()
}


function renderNested() {
  return (
      <Modal {...this.props} title="Modal heading">
        <div className="modal-body">
          <h4>Text in a modal</h4>

          <h4>Overflowing text to show scroll behavior</h4>
          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>

          <ModalTrigger modal={<MyModal />}>
            <button type='button'>Launch Modal-ception</button>
          </ModalTrigger>
        </div>
        <div className="modal-footer">
          <button onClick={this.props.onRequestHide}>Close</button>
        </div>
      </Modal>
    );
}

var NestedModal = React.createClass({
  render: renderNested
});

var MyModal = React.createClass({

  render: function() {
    return (
        <Modal bsSize='lg' {...this.props} 
          animation
          backdrop='static'>
          <div className="modal-body">
            <ModalTrigger modal={<NestedModal />}>
              <button type='button'>Launch nested Modal</button>
            </ModalTrigger>

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <hr/>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
          </div>
          <div className="modal-footer">
            <button onClick={this.props.onRequestHide}>Close</button>
          </div>
        </Modal>
      );
  }
});


React.render((
    <ModalTrigger modal={<MyModal />}>
      <button type='button'>Launch demo modal</button>
    </ModalTrigger>
  ), document.body);
