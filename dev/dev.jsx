// var chance = new (require('chance'))
var React = require('react/addons')
  , Modal = require('../src/Modal.jsx')
  , ModalTrigger = require('react-bootstrap/ModalTrigger')

var NestedModal = React.createClass({

  render: function() {
    return this.transferPropsTo(
        <Modal title="Modal heading">
          <div className="modal-body">
            <h4>Text in a modal</h4>

            <h4>Overflowing text to show scroll behavior</h4>
            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
          </div>
          <div className="modal-footer">
            <button onClick={this.props.onRequestHide}>Close</button>
          </div>
        </Modal>
      );
  }
});

var MyModal = React.createClass({

  render: function() {
    return this.transferPropsTo(
        <Modal title="Modal heading" animation={true}>
          <div className="modal-body">
            <h4>Text in a modal</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <ModalTrigger modal={<MyModal />}>
              <button type='button'>Launch demo modal</button>
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

var overlayTriggerInstance = (
    <ModalTrigger modal={<MyModal />}>
      <button type='button'>Launch demo modal</button>
    </ModalTrigger>
  );

React.renderComponent(overlayTriggerInstance, document.body);


function generateList(){
  var arr = new Array(100)

  for(var i = 0; i < arr.length; i++)
    arr[i] = { id: i + 1, name: chance.name() }

  return arr
}

function suggestList(){
  var i = 0;

  return [
    { id: i += 1, name: "james" },
    { id: i += 1, name: "jan" },
    { id: i += 1, name: "jase" },
    { id: i += 1, name: "jason" },
    { id: i += 1, name: "jim" },
    { id: i += 1, name: "jimmy" },
    { id: i += 1, name: "jimmy smith" },
    { id: i += 1, name: "john" }
  ]
}
