'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var _contains = require('dom-helpers/query/contains');

var _contains2 = _interopRequireDefault(_contains);

var _class = require('dom-helpers/class');

var _class2 = _interopRequireDefault(_class);

var _events = require('dom-helpers/events');

var _events2 = _interopRequireDefault(_events);

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

var getZIndex;

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

    _this._entering = _this._entering.bind(_this);
    _this._exiting = _this._exiting.bind(_this);

    _this.state = {
      classes: ''
    };
    return _this;
  }

  Modal.prototype.componentDidMount = function componentDidMount() {
    getZIndex = getZIndex || function () {
      var modal = document.createElement("div"),
          backdrop = document.createElement("div"),
          zIndexFactor;

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
        return baseIndex[type] + zIndexFactor * (_Modal2.default.manager.modals.length - 1);
      };
    }();
  };

  Modal.prototype._show = function _show(prevProps) {
    if (this.props.show) this.setState(this._getStyles());
  };

  Modal.prototype._entering = function _entering() {
    this._show.apply(this, arguments);
    if (this.props.onTransitionIn) {
      this.props.onTransitionIn();
    }
  };

  Modal.prototype._exiting = function _exiting() {
    this._removeAttentionClasses();
    if (this.props.onTransitionOut) {
      this.props.onTransitionOut();
    }
  };

  Modal.prototype.render = function render() {
    var _this2 = this,
        _cn;

    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var keyboard = _props.keyboard;
    var transition = _props.transition;
    var props = _objectWithoutProperties(_props, ['className', 'children', 'keyboard', 'transition']);
    var _state = this.state;
    var dialog = _state.dialog;
    var backdrop = _state.backdrop;


    var prefix = this.props.modalPrefix || Modal.getDefaultPrefix();

    if (transition === true) transition = _Fade2.default;

    var modal = _react2.default.createElement(
      'div',
      _extends({}, props, {
        ref: function ref(r) {
          return _this2.dialog = r;
        },
        style: dialog,
        className: (0, _classnames2.default)(className, prefix, { in: props.show && !transition }),
        onClick: this.props.backdrop ? function (e) {
          return _this2.handleBackdropClick(e);
        } : null
      }),
      _react2.default.createElement(
        'div',
        {
          key: 'modal',
          ref: 'inner',
          className: (0, _classnames2.default)(prefix + '-dialog', this.props.dialogClassName, this.state.classes, (_cn = {}, _cn[prefix + '-sm'] = props.small || props.sm, _cn[prefix + '-lg'] = props.large || props.lg, _cn))
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
          _this2.modal = _ref && _ref.refs.modal;
          _this2.backdrop = _ref && _ref.refs.backdrop;
        },
        container: this.props.container,
        backdrop: props.backdrop,
        show: props.show,
        onHide: this.props.onHide,
        onEntering: this._entering,
        onExiting: this._exiting,
        onEnter: this.props.onTransitionedIn,
        onExit: this.props.onTransitionedOut,
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
    var _this3 = this;

    var animate = this.state.animate;
    var classes = this.props.attentionAnimation + ' animated';

    if (!animate) this.setState({ classes: '', animate: true }, function () {

      if (_this3.props.show) {
        // trigger reflow to allow animation
        _this3.refs.inner.offsetWidth;
        _this3.setState({ animate: false, classes: classes });
      }
    });
  };

  Modal.prototype.handleBackdropClick = function handleBackdropClick(e) {
    if (e.target !== e.currentTarget) return;
    if (this.props.backdrop === 'static') return this.attention();

    this.props.onHide();
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
  show: _react2.default.PropTypes.bool,

  backdrop: _react2.default.PropTypes.oneOf(['static', true, false]),
  keyboard: _react2.default.PropTypes.bool,
  animate: _react2.default.PropTypes.bool,
  transition: _react2.default.PropTypes.any,
  container: _react2.default.PropTypes.oneOfType([_componentOrElement2.default, _react2.default.PropTypes.func]),

  onHide: _react2.default.PropTypes.func,
  onTransitionIn: _react2.default.PropTypes.func,
  onTransitionedIn: _react2.default.PropTypes.func,
  onTransitionOut: _react2.default.PropTypes.func,
  onTransitionedOut: _react2.default.PropTypes.func,

  modalPrefix: _react2.default.PropTypes.string,
  dialogClassName: _react2.default.PropTypes.string
};
Modal.defaultProps = {
  backdrop: true,
  keyboard: true,
  animate: true,
  transition: true,
  container: document.body,
  attentionAnimation: 'shake'
};
Modal.childContextTypes = {
  onModalHide: _react2.default.PropTypes.func
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