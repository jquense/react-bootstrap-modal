'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModalTitle = function (_React$Component) {
  _inherits(ModalTitle, _React$Component);

  function ModalTitle() {
    _classCallCheck(this, ModalTitle);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ModalTitle.getDefaultPrefix = function getDefaultPrefix() {
    return 'modal';
  };

  ModalTitle.prototype.render = function render() {
    var _props = this.props,
        modalPrefix = _props.modalPrefix,
        className = _props.className,
        props = _objectWithoutProperties(_props, ['modalPrefix', 'className']);

    var prefix = modalPrefix || ModalTitle.getDefaultPrefix();

    return _react2.default.createElement('h4', _extends({}, props, {
      className: (0, _classnames2.default)(className, prefix + '-title')
    }));
  };

  return ModalTitle;
}(_react2.default.Component);

ModalTitle.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalPrefix: _propTypes2.default.string
};
exports.default = ModalTitle;
module.exports = exports['default'];