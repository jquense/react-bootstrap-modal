'use strict';
var React = require('react')
  , cloneWithProps = require('../cloneWithProps')
  , Fade = require('../Fade.jsx');

module.exports = React.createClass({

  displayName: 'ModalTrigger',

  mixins: [
    require('../OverlayMixin')
  ],

  propTypes: {
    modal: React.PropTypes.renderable.isRequired
  },

  getInitialState: function () {
    return {
      show: false
    };
  },

  show: function () {
    this.setState({ show: true })
  },

  hide: function () {
    this.setState({ show: false })
  },

  toggle: function () {
    this.setState({ show: !this.state.show });
  },

  renderOverlay: function () {
    var child = this.state.show && cloneWithProps(this.props.modal, {
          onRequestHide: this.hide,
          key: 'modal',
        });
    // if (!this.state.show)
    //   return React.DOM.noscript();
    return React.createElement(Fade, null, child ? child : null)
  },

  render: function () {
    var child = React.Children.only(this.props.children);
    return cloneWithProps(child, {
        onClick: chain(child.props.onClick, this.toggle, this)
      });
  }
});

function chain(a, b, thisArg){
  return function(){
    a && a.apply(thisArg, arguments)
    b && b.apply(thisArg, arguments)
  }
}