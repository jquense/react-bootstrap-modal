'use strict';
var React = require('react')
  , cloneWithProps = require('./cloneWithProps');

module.exports = React.createClass({

  displayName: 'ModalTrigger',

  mixins: [
    require('./OverlayMixin')
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
    if (!this.state.show)
      return React.DOM.noscript();

    return cloneWithProps(this.props.modal, {
        onRequestHide: this.hide
      });
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