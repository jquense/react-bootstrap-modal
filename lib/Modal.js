var babelHelpers = require("./util/babelHelpers.js");
var React = babelHelpers.interopRequire(require("react"));

var findDOMNode = require("react-dom").findDOMNode;

var canUseDOM = babelHelpers.interopRequire(require("dom-helpers/util/inDOM"));
var BaseModal = babelHelpers.interopRequire(require("react-overlays/lib/Modal"));
var isOverflowing = babelHelpers.interopRequire(require("react-overlays/lib/utils/isOverflowing"));
var Fade = babelHelpers.interopRequire(require("./Fade"));
var Body = babelHelpers.interopRequire(require("./Body"));
var Header = babelHelpers.interopRequire(require("./Header"));
var Title = babelHelpers.interopRequire(require("./Title"));
var Footer = babelHelpers.interopRequire(require("./Footer"));
var Dismiss = babelHelpers.interopRequire(require("./Dismiss"));
var ownerDocument = babelHelpers.interopRequire(require("dom-helpers/ownerDocument"));
var contains = babelHelpers.interopRequire(require("dom-helpers/query/contains"));
var classes = babelHelpers.interopRequire(require("dom-helpers/class"));
var events = babelHelpers.interopRequire(require("dom-helpers/events"));
var scrollbarWidth = babelHelpers.interopRequire(require("dom-helpers/util/scrollbarSize"));
var css = babelHelpers.interopRequire(require("dom-helpers/style"));
var cn = babelHelpers.interopRequire(require("classnames"));

var baseIndex = {};
var PREFIX = "modal";

var getZIndex;

var ModalContent = (function (_React$Component) {
  function ModalContent() {
    babelHelpers.classCallCheck(this, ModalContent);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  babelHelpers.inherits(ModalContent, _React$Component);
  ModalContent.childContextTypes = {
    onModalHide: React.PropTypes.func
  };

  ModalContent.prototype.getChildContext = function getChildContext() {
    return this._context || (this._context = { onModalHide: this.props.onHide });
  };

  ModalContent.prototype.render = function render() {
    return React.createElement(
      "div",
      this.props,
      this.props.children
    );
  };

  return ModalContent;
})(React.Component);

var Modal = (function (_React$Component2) {
  function Modal() {
    babelHelpers.classCallCheck(this, Modal);

    _React$Component2.call(this);
    this._show = this._show.bind(this);
    this._removeAttentionClasses = this._removeAttentionClasses.bind(this);

    this.state = {
      classes: ""
    };
  }

  babelHelpers.inherits(Modal, _React$Component2);

  Modal.getDefaultPrefix = function getDefaultPrefix() {
    return PREFIX;
  };

  Modal.propTypes = {
    show: React.PropTypes.bool,

    backdrop: React.PropTypes.oneOf(["static", true, false]),
    keyboard: React.PropTypes.bool,
    animate: React.PropTypes.bool,
    onHide: React.PropTypes.func,

    modalPrefix: React.PropTypes.string,
    dialogClassName: React.PropTypes.string };
  Modal.defaultProps = {
    backdrop: true,
    keyboard: true,
    animate: true,
    attentionAnimation: "shake" };
  Modal.childContextTypes = {
    onModalHide: React.PropTypes.func
  };

  Modal.prototype.getChildContext = function getChildContext() {
    return this._context || (this._context = { onModalHide: this.props.onHide });
  };

  Modal.prototype.componentDidMount = function componentDidMount() {
    getZIndex = getZIndex || (function () {
      var modal = document.createElement("div"),
          backdrop = document.createElement("div"),
          zIndexFactor;

      modal.className = "modal hide";
      backdrop.className = "modal-backdrop hide";

      document.body.appendChild(modal);
      document.body.appendChild(backdrop);

      baseIndex.modal = +css(modal, "z-index");
      baseIndex.backdrop = +css(backdrop, "z-index");
      zIndexFactor = baseIndex.modal - baseIndex.backdrop;

      document.body.removeChild(modal);
      document.body.removeChild(backdrop);

      return function (type) {
        return baseIndex[type] + zIndexFactor * (BaseModal.manager.modals.length - 1);
      };
    })();
  };

  Modal.prototype._show = function _show(prevProps) {
    if (this.props.show) this.setState(this._getStyles());
  };

  Modal.prototype.render = function render() {
    var _this = this;

    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var props = babelHelpers.objectWithoutProperties(_props, ["className", "children"]);
    var _state = this.state;
    var dialog = _state.dialog;
    var backdrop = _state.backdrop;

    var prefix = this.props.modalPrefix || Modal.getDefaultPrefix();

    var modal = React.createElement(
      "div",
      babelHelpers._extends({}, props, {
        ref: "modal",
        style: dialog,
        className: cn(className, prefix),
        onClick: this.props.backdrop ? function (e) {
          return _this.handleBackdropClick(e);
        } : null
      }),
      React.createElement(
        "div",
        {
          key: "modal",
          ref: "dialog",
          className: cn(prefix + "-dialog", this.props.dialogClassName, this.state.classes, (function () {
            var _cn = {};
            _cn[prefix + "-sm"] = props.small || props.sm;
            _cn[prefix + "-lg"] = props.large || props.lg;
            return _cn;
          })())
        },
        React.createElement(
          "div",
          { className: prefix + "-content" },
          children
        )
      )
    );

    return React.createElement(
      BaseModal,
      {
        show: this.props.show,
        onHide: this.props.onHide,
        onEntering: this._show,
        onExiting: this._removeAttentionClasses,
        backdropStyle: backdrop,
        backdropClassName: prefix + "-backdrop",
        containerClassName: prefix + "-open",
        transition: Fade,
        dialogTransitionTimeout: Modal.TRANSITION_DURATION,
        backdropTransitionTimeout: Modal.BACKDROP_TRANSITION_DURATION
      },
      modal
    );
  };

  Modal.prototype.attention = function attention() {
    var _this = this;

    var animate = this.state.animate;
    var classes = this.props.attentionAnimation + " animated";

    if (!animate) this.setState({ classes: "", animate: true }, function () {

      if (_this.props.show) {
        // trigger reflow to allow animation
        _this.refs.dialog.offsetWidth;
        _this.setState({ animate: false, classes: classes });
      }
    });
  };

  Modal.prototype.handleBackdropClick = function handleBackdropClick(e) {
    if (e.target !== e.currentTarget) return;
    if (this.props.backdrop === "static") return this.attention();

    this.props.onHide();
  };

  Modal.prototype._getStyles = function _getStyles() {
    if (!canUseDOM) return {};

    var node = findDOMNode(this.refs.modal),
        doc = ownerDocument(node),
        scrollHt = node.scrollHeight,
        bodyIsOverflowing = isOverflowing(this.props.container || doc.body),
        modalIsOverflowing = scrollHt > doc.documentElement.clientHeight;

    return {
      dialog: {
        zIndex: getZIndex("modal"),
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth : void 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth : void 0
      },
      backdrop: {
        zIndex: getZIndex("backdrop")
      }
    };
  };

  Modal.prototype._removeAttentionClasses = function _removeAttentionClasses() {
    this.setState({ classes: "" });
  };

  return Modal;
})(React.Component);

Modal.injectCSSPrefix = function (prefix) {
  PREFIX = prefix;
};

function getDefaultPrefix() {
  return PREFIX;
}

Body.getDefaultPrefix = getDefaultPrefix;
Header.getDefaultPrefix = getDefaultPrefix;
Title.getDefaultPrefix = getDefaultPrefix;
Footer.getDefaultPrefix = getDefaultPrefix;

Modal.Body = Body;
Modal.Header = Header;
Modal.Title = Title;
Modal.Footer = Footer;
Modal.Dismiss = Dismiss;

Modal.BaseModal = Modal;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

module.exports = Modal;