'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react'),
    cn = require('classnames'),
    Dismiss = require('./Dismiss');

var ModalHeader = (function (_React$Component) {
  _inherits(ModalHeader, _React$Component);

  function ModalHeader() {
    _classCallCheck(this, ModalHeader);

    _React$Component.apply(this, arguments);
  }

  ModalHeader.getDefaultPrefix = function getDefaultPrefix() {
    return 'modal';
  };

  ModalHeader.prototype.render = function render() {
    var prefix = this.props.modalPrefix || ModalHeader.getDefaultPrefix();

    return React.createElement(
      'div',
      _extends({}, this.props, {
        className: cn(this.props.className, prefix + '-header')
      }),
      this.props.closeButton && React.createElement(
        Dismiss,
        {
          className: 'close',
          'aria-label': this.props['aria-label'] || 'Close Modal',
          style: { marginTop: -2 }
        },
        React.createElement(
          'span',
          { 'aria-hidden': 'true' },
          '×'
        )
      ),
      this.props.children
    );
  };

  _createClass(ModalHeader, null, [{
    key: '_isModalHeader',
    value: true,
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      closeButton: false
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      onModalHide: React.PropTypes.func
    },
    enumerable: true
  }]);

  return ModalHeader;
})(React.Component);

module.exports = ModalHeader;