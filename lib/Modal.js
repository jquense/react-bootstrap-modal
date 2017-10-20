'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _Modal = require('react-overlays/lib/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _isOverflowing = require('react-overlays/lib/utils/isOverflowing');

var _isOverflowing2 = _interopRequireDefault(_isOverflowing);

var _componentOrElement = require('react-prop-types/lib/componentOrElement');

var _componentOrElement2 = _interopRequireDefault(_componentOrElement);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Dismiss = require('./Dismiss');

var _Dismiss2 = _interopRequireDefault(_Dismiss);

var _ownerDocument = require('dom-helpers/ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _inDOM = require('dom-helpers/util/inDOM');

var _inDOM2 = _interopRequireDefault(_inDOM);

var _scrollbarSize = require('dom-helpers/util/scrollbarSize');

var _scrollbarSize2 = _interopRequireDefault(_scrollbarSize);

var _style = require('dom-helpers/style');

var _style2 = _interopRequireDefault(_style);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var baseIndex = {};
var PREFIX = 'modal';

var getZIndex = void 0;

var omit = function omit(obj, keys) {
  return Object.keys(obj).reduce(function (o, key) {
    if (keys.indexOf(key) === -1) o[key] = obj[key];
    return o;
  }, {});
};

var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  Modal.getDefaultPrefix = function getDefaultPrefix() {
    return PREFIX;
  };

  Modal.prototype.getChildContext = function getChildContext() {
    return this._context || (this._context = { onModalHide: this.props.onHide });
  };

  function Modal() {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.handleEntering = _this.handleEntering.bind(_this);
    _this.handleExiting = _this.handleExiting.bind(_this);

    _this.state = {
      classes: ''
    };
    return _this;
  }

  Modal.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    getZIndex = getZIndex || function () {
      var modal = document.createElement('div'),
          backdrop = document.createElement('div'),
          zIndexFactor = void 0;

      modal.className = 'modal hide';
      backdrop.className = 'modal-backdrop hide';

      document.body.appendChild(modal);
      document.body.appendChild(backdrop);

      baseIndex.modal = +(0, _style2.default)(modal, 'z-index');
      baseIndex.backdrop = +(0, _style2.default)(backdrop, 'z-index');
      zIndexFactor = baseIndex.modal - baseIndex.backdrop;

      document.body.removeChild(modal);
      document.body.removeChild(backdrop);

      return function (type) {
        return baseIndex[type] + zIndexFactor * (_this2.props.manager.modals.length - 1);
      };
    }();
  };

  Modal.prototype.handleEntering = function handleEntering() {
    this._show.apply(this, arguments);

    if (this.props.onEntering) {
      this.props.onEntering();
    }
  };

  Modal.prototype.handleExiting = function handleExiting() {
    this._removeAttentionClasses();
    if (this.props.onExiting) {
      this.props.onExiting();
    }
  };

  Modal.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        className = _props.className,
        children = _props.children,
        keyboard = _props.keyboard,
        transition = _props.transition,
        modalPrefix = _props.modalPrefix,
        dialogClassName = _props.dialogClassName,
        container = _props.container,
        onEnter = _props.onEnter,
        onEntered = _props.onEntered,
        onExit = _props.onExit,
        onExited = _props.onExited,
        props = _objectWithoutProperties(_props, ['className', 'children', 'keyboard', 'transition', 'modalPrefix', 'dialogClassName', 'container', 'onEnter', 'onEntered', 'onExit', 'onExited']);

    var _state = this.state,
        dialog = _state.dialog,
        classes = _state.classes,
        backdrop = _state.backdrop;


    delete props.manager;
    var elementProps = omit(props, Object.keys(Modal.propTypes));

    var prefix = modalPrefix || Modal.getDefaultPrefix();

    if (transition === true) transition = _Fade2.default;

    var modal = _react2.default.createElement(
      'div',
      _extends({}, elementProps, {
        ref: function ref(r) {
          return _this3.dialog = r;
        },
        style: dialog,
        className: (0, _classnames2.default)(className, prefix, { in: props.show && !transition }),
        onClick: this.props.backdrop ? function (e) {
          return _this3.handleBackdropClick(e);
        } : null
      }),
      _react2.default.createElement(
        'div',
        {
          key: 'modal',
          ref: 'inner',
          className: (0, _classnames2.default)(prefix + '-dialog', dialogClassName, classes, (props.small || props.sm) && prefix + '-sm', (props.large || props.lg) && prefix + '-lg')
        },
        _react2.default.createElement(
          'div',
          { className: prefix + '-content' },
          children
        )
      )
    );

    return _react2.default.createElement(
      _Modal2.default,
      {
        keyboard: keyboard,
        ref: function ref(_ref) {
          _this3.modal = _ref && _ref.modal;
          _this3.backdrop = _ref && _ref.backdrop;
        },
        container: container,
        backdrop: props.backdrop,
        show: props.show,
        onHide: this.props.onHide,
        onEnter: onEnter,
        onEntering: this.handleEntering,
        onEntered: onEntered,
        onExit: onExit,
        onExiting: this.handleExiting,
        onExited: onExited,
        backdropStyle: backdrop,
        backdropClassName: prefix + '-backdrop',
        containerClassName: prefix + '-open',
        transition: transition,
        dialogTransitionTimeout: Modal.TRANSITION_DURATION,
        backdropTransitionTimeout: Modal.BACKDROP_TRANSITION_DURATION
      },
      modal
    );
  };

  Modal.prototype.attention = function attention() {
    var _this4 = this;

    var attentionClass = this.props.attentionClass;


    if (attentionClass) this.setState({ classes: '' }, function () {
      if (_this4.props.show) {
        // eslint-disable-next-line no-unused-expressions
        _this4.refs.inner.offsetWidth;
        _this4.setState({
          classes: attentionClass + ' animated'
        });
      }
    });
  };

  Modal.prototype.handleBackdropClick = function handleBackdropClick(e) {
    if (e.target !== e.currentTarget) return;
    if (this.props.backdrop === 'static') return this.attention();

    this.props.onHide();
  };

  Modal.prototype._show = function _show() {
    if (this.props.show) this.setState(this._getStyles());
  };

  Modal.prototype._getStyles = function _getStyles() {
    if (!_inDOM2.default) return {};

    var node = (0, _reactDom.findDOMNode)(this.dialog),
        doc = (0, _ownerDocument2.default)(node),
        scrollHt = node.scrollHeight,
        bodyIsOverflowing = (0, _isOverflowing2.default)(this.props.container || doc.body),
        modalIsOverflowing = scrollHt > doc.documentElement.clientHeight;

    return {
      dialog: {
        zIndex: getZIndex('modal'),
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? (0, _scrollbarSize2.default)() : void 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? (0, _scrollbarSize2.default)() : void 0
      },
      backdrop: {
        zIndex: getZIndex('backdrop')
      }
    };
  };

  Modal.prototype._removeAttentionClasses = function _removeAttentionClasses() {
    this.setState({ classes: '' });
  };

  return Modal;
}(_react2.default.Component);

Modal.propTypes = {
  show: _propTypes2.default.bool,

  /** sizes **/
  small: _propTypes2.default.bool,
  sm: _propTypes2.default.bool,
  large: _propTypes2.default.bool,
  lg: _propTypes2.default.bool,
  /** --- **/

  backdrop: _propTypes2.default.oneOf(['static', true, false]),
  keyboard: _propTypes2.default.bool,
  animate: _propTypes2.default.bool,
  transition: _propTypes2.default.any,
  container: _propTypes2.default.oneOfType([_componentOrElement2.default, _propTypes2.default.func]),

  onHide: _propTypes2.default.func,
  onEnter: _propTypes2.default.func,
  onEntering: _propTypes2.default.func,
  onEntered: _propTypes2.default.func,
  onExit: _propTypes2.default.func,
  onExiting: _propTypes2.default.func,
  onExited: _propTypes2.default.func,

  modalPrefix: _propTypes2.default.string,
  dialogClassName: _propTypes2.default.string,
  attentionClass: _propTypes2.default.string
};
Modal.defaultProps = {
  backdrop: true,
  keyboard: true,
  animate: true,
  transition: true,
  container: _inDOM2.default ? document.body : null,
  attentionClass: 'shake',
  manager: (_Modal2.default.getDefaultProps ? _Modal2.default.getDefaultProps() : _Modal2.default.defaultProps).manager
};
Modal.childContextTypes = {
  onModalHide: _propTypes2.default.func
};


Modal.injectCSSPrefix = function (prefix) {
  PREFIX = prefix;
};

function getDefaultPrefix() {
  return PREFIX;
}

_Body2.default.getDefaultPrefix = getDefaultPrefix;
_Header2.default.getDefaultPrefix = getDefaultPrefix;
_Title2.default.getDefaultPrefix = getDefaultPrefix;
_Footer2.default.getDefaultPrefix = getDefaultPrefix;

Modal.Body = _Body2.default;
Modal.Header = _Header2.default;
Modal.Title = _Title2.default;
Modal.Footer = _Footer2.default;
Modal.Dismiss = _Dismiss2.default;

Modal.BaseModal = Modal;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

exports.default = Modal;
module.exports = exports['default'];