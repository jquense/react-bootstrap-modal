'use strict';

require('../src/less/bbm-complete.less')

var React = require('react/addons')
  , Modal = require('../src/components/Modal.jsx')
  , ModalTrigger = require('../src/components/ModalTrigger')


var NestedModal = React.createClass({

  render: function() {
    return this.transferPropsTo(
        <Modal title="Modal heading">
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
});

function h(p){
  return function(){console.log(p)}
}

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

            <h4>Popover in a modal</h4>
            <p>TODO</p>

            <h4>Tooltips in a modal</h4>
            <p>TODO</p>

            <hr />

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
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
