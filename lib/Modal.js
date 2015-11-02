'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactOverlaysLibModal = require('react-overlays/lib/Modal');

var _reactOverlaysLibModal2 = _interopRequireDefault(_reactOverlaysLibModal);

var _reactOverlaysLibUtilsIsOverflowing = require('react-overlays/lib/utils/isOverflowing');

var _reactOverlaysLibUtilsIsOverflowing2 = _interopRequireDefault(_reactOverlaysLibUtilsIsOverflowing);

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

var _domHelpersOwnerDocument = require('dom-helpers/ownerDocument');

var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);

var _domHelpersUtilInDOM = require('dom-helpers/util/inDOM');

var _domHelpersUtilInDOM2 = _interopRequireDefault(_domHelpersUtilInDOM);

var _domHelpersQueryContains = require('dom-helpers/query/contains');

var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);

var _domHelpersClass = require('dom-helpers/class');

var _domHelpersClass2 = _interopRequireDefault(_domHelpersClass);

var _domHelpersEvents = require('dom-helpers/events');

var _domHelpersEvents2 = _interopRequireDefault(_domHelpersEvents);

var _domHelpersUtilScrollbarSize = require('dom-helpers/util/scrollbarSize');

var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = _interopRequireDefault(_domHelpersStyle);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var baseIndex = {};
var PREFIX = 'modal';

var getZIndex;

var Modal = (function (_React$Component) {
  _inherits(Modal, _React$Component);

  Modal.getDefaultPrefix = function getDefaultPrefix() {
    return PREFIX;
  };

  Modal.prototype.getChildContext = function getChildContext() {
    return this._context || (this._context = { onModalHide: this.props.onHide });
  };

  _createClass(Modal, null, [{
    key: 'propTypes',
    value: {
      show: _react2['default'].PropTypes.bool,

      backdrop: _react2['default'].PropTypes.oneOf(['static', true, false]),
      keyboard: _react2['default'].PropTypes.bool,
      animate: _react2['default'].PropTypes.bool,
      onHide: _react2['default'].PropTypes.func,

      modalPrefix: _react2['default'].PropTypes.string,
      dialogClassName: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      backdrop: true,
      keyboard: true,
      animate: true,
      attentionAnimation: 'shake'
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      onModalHide: _react2['default'].PropTypes.func
    },
    enumerable: true
  }]);

  function Modal() {
    _classCallCheck(this, Modal);

    _React$Component.call(this);
    this._show = this._show.bind(this);
    this._removeAttentionClasses = this._removeAttentionClasses.bind(this);

    this.state = {
      classes: ''
    };
  }

  Modal.prototype.componentDidMount = function componentDidMount() {
    getZIndex = getZIndex || (function () {
      var modal = document.createElement("div"),
          backdrop = document.createElement("div"),
          zIndexFactor;

      modal.className = 'modal hide';
      backdrop.className = 'modal-backdrop hide';

      document.body.appendChild(modal);
      document.body.appendChild(backdrop);

      baseIndex.modal = +_domHelpersStyle2['default'](modal, 'z-index');
      baseIndex.backdrop = +_domHelpersStyle2['default'](backdrop, 'z-index');
      zIndexFactor = baseIndex.modal - baseIndex.backdrop;

      document.body.removeChild(modal);
      document.body.removeChild(backdrop);

      return function (type) {
        return baseIndex[type] + zIndexFactor * (_reactOverlaysLibModal2['default'].manager.modals.length - 1);
      };
    })();
  };

  Modal.prototype._show = function _show(prevProps) {
    if (this.props.show) this.setState(this._getStyles());
  };

  Modal.prototype.render = function render() {
    var _cn,
        _this = this;

    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var keyboard = _props.keyboard;
    var props = _objectWithoutProperties(_props, ['className', 'children', 'keyboard']);
    var _state = this.state;
    var dialog = _state.dialog;
    var backdrop = _state.backdrop;

    var prefix = this.props.modalPrefix || Modal.getDefaultPrefix();

    var modal = _react2['default'].createElement(
      'div',
      _extends({}, props, {
        ref: 'modal',
        style: dialog,
        className: _classnames2['default'](className, prefix),
        onClick: this.props.backdrop ? function (e) {
          return _this.handleBackdropClick(e);
        } : null
      }),
      _react2['default'].createElement(
        'div',
        {
          key: 'modal',
          ref: 'dialog',
          className: _classnames2['default'](prefix + '-dialog', this.props.dialogClassName, this.state.classes, (_cn = {}, _cn[prefix + '-sm'] = props.small || props.sm, _cn[prefix + '-lg'] = props.large || props.lg, _cn))
        },
        _react2['default'].createElement(
          'div',
          { className: prefix + '-content' },
          children
        )
      )
    );

    return _react2['default'].createElement(
      _reactOverlaysLibModal2['default'],
      {
        keyboard: keyboard,
        backdrop: props.backdrop,
        show: this.props.show,
        onHide: this.props.onHide,
        onEntering: this._show,
        onExiting: this._removeAttentionClasses,
        backdropStyle: backdrop,
        backdropClassName: prefix + '-backdrop',
        containerClassName: prefix + '-open',
        transition: _Fade2['default'],
        dialogTransitionTimeout: Modal.TRANSITION_DURATION,
        backdropTransitionTimeout: Modal.BACKDROP_TRANSITION_DURATION
      },
      modal
    );
  };

  Modal.prototype.attention = function attention() {
    var _this2 = this;

    var animate = this.state.animate;
    var classes = this.props.attentionAnimation + ' animated';

    if (!animate) this.setState({ classes: '', animate: true }, function () {

      if (_this2.props.show) {
        // trigger reflow to allow animation
        _this2.refs.dialog.offsetWidth;
        _this2.setState({ animate: false, classes: classes });
      }
    });
  };

  Modal.prototype.handleBackdropClick = function handleBackdropClick(e) {
    if (e.target !== e.currentTarget) return;
    if (this.props.backdrop === 'static') return this.attention();

    this.props.onHide();
  };

  Modal.prototype._getStyles = function _getStyles() {
    if (!_domHelpersUtilInDOM2['default']) return {};

    var node = _reactDom.findDOMNode(this.refs.modal),
        doc = _domHelpersOwnerDocument2['default'](node),
        scrollHt = node.scrollHeight,
        bodyIsOverflowing = _reactOverlaysLibUtilsIsOverflowing2['default'](this.props.container || doc.body),
        modalIsOverflowing = scrollHt > doc.documentElement.clientHeight;

    return {
      dialog: {
        zIndex: getZIndex('modal'),
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default'] : void 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default'] : void 0
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
})(_react2['default'].Component);

Modal.injectCSSPrefix = function (prefix) {
  PREFIX = prefix;
};

function getDefaultPrefix() {
  return PREFIX;
}

_Body2['default'].getDefaultPrefix = getDefaultPrefix;
_Header2['default'].getDefaultPrefix = getDefaultPrefix;
_Title2['default'].getDefaultPrefix = getDefaultPrefix;
_Footer2['default'].getDefaultPrefix = getDefaultPrefix;

Modal.Body = _Body2['default'];
Modal.Header = _Header2['default'];
Modal.Title = _Title2['default'];
Modal.Footer = _Footer2['default'];
Modal.Dismiss = _Dismiss2['default'];

Modal.BaseModal = Modal;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

exports['default'] = Modal;
module.exports = exports['default'];