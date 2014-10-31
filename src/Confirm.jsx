
/**
 * @jsx React.DOM
 */

var React = require('react')
  , cloneWithProps = require('react-bootstrap/utils/cloneWithProps')
  , OverlayMixin = require('react-bootstrap/OverlayMixin')
  , DialogMixin = require('./DialogMixin')
  , Modal = require('./Modal.jsx');

var Confirm = React.createClass({

  mixins: [ OverlayMixin, DialogMixin ],

  getDefaultProps: function(){
    return {
      accept: 'Yes',
      reject: 'No'
    }
  },

  

  renderOverlay: function () {
    if (!this.props.open) return <noscript/>

    return (
      <Modal title={this.props.title} 
        backdrop={true}
        animation={this.props.animation} 
        onRequestHide={this._action.bind(null, 'reject')}>
        <div className="modal-body">
          {this.props.children }
        </div>
        <div className="modal-footer">
          { this._renderButton('accept', 'btn btn-primary') }
          { this._renderButton('reject', 'btn btn-link') }
        </div>
      </Modal>
    )
  },

  render: function(){
    return <noscript/>
  },

  _action: function(action, e){
    this.props.onAction
      && this.props.onAction(action === 'accept')
  }

});

module.exports = Confirm;
