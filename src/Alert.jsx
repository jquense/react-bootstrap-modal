/**
 * @jsx React.DOM
 */
var React = require('react')
  , OverlayMixin = require('react-bootstrap/OverlayMixin')
  , DialogMixin = require('./DialogMixin')
  , Modal = require('./Modal.jsx');

var Alert = React.createClass({

  mixins: [ OverlayMixin, DialogMixin ],

  getDefaultProps: function(){
    return {
      accept: 'Ok'
    }
  },

  renderOverlay: function () {
    if (!this.props.open) return <noscript/>

    return (
      <Modal title={this.props.title} 
        backdrop={false}
        closeButton={false}
        animation={this.props.animation} 
        onRequestHide={this._action.bind(null, 'cancel')}>
        <div className="modal-body">
          {this.props.children }
        </div>
        <div className="modal-footer">
          { this._renderButton('accept', 'btn btn-primary') }
        </div>
      </Modal>
    )
  },

  render: function(){
    return <noscript/>
  },

  _action: function(action, e){
    this.props.onAction && this.props.onAction()
  }

});

module.exports = Alert;