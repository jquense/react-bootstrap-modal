'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Dismiss = require('./Dismiss');

var _Dismiss2 = _interopRequireDefault(_Dismiss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalHeader = function (_React$Component) {
  _inherits(ModalHeader, _React$Component);

  function ModalHeader() {
    _classCallCheck(this, ModalHeader);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ModalHeader.getDefaultPrefix = function getDefaultPrefix() {
    return 'modal';
  };

  ModalHeader.prototype.render = function render() {
    var prefix = this.props.modalPrefix || ModalHeader.getDefaultPrefix();

    return _react2.default.createElement(
      'div',
      _extends({}, this.props, {
        className: (0, _classnames2.default)(this.props.className, prefix + '-header')
      }),
      this.props.closeButton && _react2.default.createElement(
        _Dismiss2.default,
        {
          className: 'close',
          'aria-label': this.props['aria-label'] || 'Close Modal',
          style: { marginTop: -2 }
        },
        _react2.default.createElement(
          'span',
          { 'aria-hidden': 'true' },
          '×'
        )
      ),
      this.props.children
    );
  };

  return ModalHeader;
}(_react2.default.Component);

ModalHeader._isModalHeader = true;
ModalHeader.defaultProps = {
  closeButton: false
};
ModalHeader.contextTypes = {
  onModalHide: _react2.default.PropTypes.func
};


module.exports = ModalHeader;