/** @jsx React.DOM */
'use strict';
var React = require('react')
  , BaseModal = require('./BaseModal')
  , Fade = require('./Fade');

var Modal = React.createClass({displayName: 'Modal',

  propTypes: {
    animation:     React.PropTypes.bool,
    onRequestHide: React.PropTypes.func.isRequired,
    onHide:        React.PropTypes.func,
    onHidden:      React.PropTypes.func,
    onShow:        React.PropTypes.func,
    onShown:       React.PropTypes.func
  },

  render: function() {
    var $__0=        this.props,onHidden=$__0.onHidden,onShow=$__0.onShow,onShown=$__0.onShown,onHide=$__0.onHide,props=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onHidden:1,onShow:1,onShown:1,onHide:1})
      , fadeProps = { onHidden:onHidden, onShown:onShown, onShow:onShow, onHide:onHide };

    return (
      Fade(Object.assign({}, fadeProps, {in: props.show, animate: props.animation}), 
        BaseModal(Object.assign({}, props ), this.props.children)
      )
    );
  }
});


module.exports = Modal