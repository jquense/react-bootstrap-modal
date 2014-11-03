'use strict';
var React = require('react')
  , BaseModal = require('./BaseModal.jsx')
  , Fade = require('./Fade.jsx');

var Modal = React.createClass({

  propTypes: {
    animation:     React.PropTypes.bool,
    onRequestHide: React.PropTypes.func.isRequired,
    onHide:        React.PropTypes.func,
    onHidden:      React.PropTypes.func,
    onShow:        React.PropTypes.func,
    onShown:       React.PropTypes.func
  },

  render: function() {
    var { onHidden, onShow, onShown, onHide, ...props } = this.props
      , fadeProps = { onHidden, onShown, onShow, onHide };

    return (
      <Fade {...fadeProps} in={props.show} animate={props.animation}>
        <BaseModal {...props }>{this.props.children}</BaseModal>
      </Fade>
    );
  }
});


module.exports = Modal