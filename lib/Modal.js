"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = babelHelpers.interopRequire(require("react"));
var activeElement = babelHelpers.interopRequire(require("react/lib/getActiveElement"));
var canUseDOM = babelHelpers.interopRequire(require("dom-helpers/util/inDOM"));
var Fade = babelHelpers.interopRequire(require("./Fade"));
var Body = babelHelpers.interopRequire(require("./Body"));
var Header = babelHelpers.interopRequire(require("./Header"));
var Title = babelHelpers.interopRequire(require("./Title"));
var Footer = babelHelpers.interopRequire(require("./Footer"));
var Dismiss = babelHelpers.interopRequire(require("./Dismiss"));
var createOverlay = babelHelpers.interopRequire(require("./createOverlay"));
var contains = babelHelpers.interopRequire(require("dom-helpers/query/contains"));
var classes = babelHelpers.interopRequire(require("dom-helpers/class"));
var events = babelHelpers.interopRequire(require("dom-helpers/events"));
var scrollbarWidth = babelHelpers.interopRequire(require("dom-helpers/util/scrollbarSize"));
var css = babelHelpers.interopRequire(require("dom-helpers/style"));
var cn = babelHelpers.interopRequire(require("classnames"));

var stack = [],
    baseIndex = {};

var getZIndex = (function () {
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
    return baseIndex[type] + zIndexFactor * stack.length;
  };
})();

var onFocus = function (handler) {
  events.on(document, "focus", handler, true);

  return function () {
    return events.off(document, "focus", handler, true);
  };
};

var Modal = (function () {
  var Modal = (function (_React$Component) {
    function Modal() {
      babelHelpers.classCallCheck(this, Modal);

      _React$Component.call(this);

      this._focus = this._focus.bind(this);
      this.state = {
        classes: ""
      };
    }

    babelHelpers.inherits(Modal, _React$Component);
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
      attentionAnimation: "shake",
      modalPrefix: "modal"
    };
    Modal.childContextTypes = {
      onModalHide: React.PropTypes.func
    };

    Modal.prototype.componentWillMount = function componentWillMount() {
      if (canUseDOM) this.lastFocus = activeElement();
    };

    Modal.prototype.componentDidMount = function componentDidMount() {
      var _this = this;

      this._mounted = true;
      this._bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight;

      if (!stack.length) {
        classes.addClass(document.body, "modal-open");
        this._styleBody();
      }

      if (stack.indexOf(this) === -1) stack.push(this);

      events.on(document, "keyup", this.handleDocumentKeyUp = function (e) {
        if (_this.props.keyboard && e.keyCode === 27 && _this.isTopModal()) {
          if (_this.props.backdrop === "static") return _this.attention();

          _this.props.onHide();
        }
      });

      events.on(window, "resize", this.handleUpdate = function () {
        return _this.setState(_this._getStyles());
      });

      this._removeFocusListener = onFocus(this._focus);

      if (this.props.backdrop && this.props.show) this.iosClickHack();

      this.setState(this._getStyles(), function () {
        return _this.checkForFocus();
      });
    };

    Modal.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (this.props.backdrop && this.props.show && this.props.show !== prevProps.show) this.iosClickHack();

      if (this.state.attention) {
        React.findDOMNode(this).offsetWidth; // trigger reflow to allow animation
        this.setState(babelHelpers._extends({}, this._getStyles(), {
          attention: false,
          classes: this.props.attentionAnimation + " animated"
        }));
      }

      if (this._needsStyleUpdate) {
        this._needsStyleUpdate = false;
        this.setState(this._getStyles());
      }
    };

    Modal.prototype.componentWillUnmount = function componentWillUnmount() {
      var idx = stack.indexOf(this);

      this._mounted = false;

      if (this.state.classes) this._removeAttentionClasses();

      if (idx !== -1) stack.splice(idx, 1);

      if (!stack.length) {
        classes.removeClass(document.body, "modal-open");
        css(document.body, { "padding-right": this._containerPadding });
      }

      this._removeFocusListener();

      events.off(document, "keyup", this.handleDocumentKeyUp);
      events.off(window, "resize", this.handleUpdate);
    };

    Modal.prototype.getChildContext = function getChildContext() {
      return { onModalHide: this.props.onHide };
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

      var modal = React.createElement(
        "div",
        babelHelpers._extends({}, props, {
          ref: "modal",
          tabIndex: "-1",
          role: "dialog",
          style: dialog,
          className: cn(className, this.props.modalPrefix),
          onClick: this.props.backdrop ? function (e) {
            return _this.handleBackdropClick(e);
          } : null }),
        React.createElement(
          "div",
          {
            key: "modal",
            ref: "dialog",
            className: cn(this.props.modalPrefix + "-dialog", this.props.dialogClassName, this.state.classes)
          },
          React.createElement(
            "div",
            { className: this.props.modalPrefix + "-content" },
            children
          )
        )
      );

      return this.props.backdrop ? this.renderBackdrop(modal, backdrop) : modal;
    };

    Modal.prototype.renderBackdrop = function renderBackdrop(modal, styles) {
      var _this = this;

      var animate = this.props.animate;

      var duration = Modal.BACKDROP_TRANSITION_DURATION; //eslint-disable-line no-use-before-define

      var backdrop = React.createElement("div", { ref: "backdrop",
        style: styles,
        className: cn(this.props.modalPrefix + "-backdrop", { in: this.props.show && !animate }),
        onClick: function (e) {
          return _this.handleBackdropClick(e);
        }
      });

      return React.createElement(
        "div",
        null,
        animate ? React.createElement(
          Fade,
          { transitionAppear: true, in: this.props.show, duration: duration },
          backdrop
        ) : backdrop,
        modal
      );
    };

    Modal.prototype.checkForFocus = function checkForFocus() {
      var current = activeElement(),
          focusInModal = current && contains(React.findDOMNode(this.refs.modal), current);

      if (this.props.autoFocus && !focusInModal) {
        this.lastFocus = current;
        this.focus();
      }
    };

    Modal.prototype._focus = function _focus() {
      var el = React.findDOMNode(this);

      if (this.isTopModal() && el !== activeElement() && !contains(el, document.activeElement)) this.focus();
    };

    Modal.prototype.focus = function focus() {
      React.findDOMNode(this.refs.modal).focus();
    };

    Modal.prototype.attention = function attention() {
      this.setState({
        attention: true,
        classes: ""
      });

      this.focus();
    };

    Modal.prototype.iosClickHack = function iosClickHack() {
      React.findDOMNode(this.refs.modal).onclick = function () {};
      React.findDOMNode(this.refs.backdrop).onclick = function () {};
    };

    Modal.prototype.isTopModal = function isTopModal() {
      return !!stack.length && stack[stack.length - 1] === this;
    };

    Modal.prototype.handleBackdropClick = function handleBackdropClick(e) {
      if (e.target !== e.currentTarget) return;
      if (this.props.backdrop === "static") return this.attention();

      this.props.onHide();
    };

    Modal.prototype._styleBody = function _styleBody() {
      var padding = parseInt(css(document.body, "padding-right") || 0, 10);

      this._containerPadding = document.body.style.paddingRight || "";

      if (this._bodyIsOverflowing) css(document.body, { "padding-right": "" + (padding + scrollbarWidth) + "px" });
    };

    Modal.prototype._getStyles = function _getStyles() {
      if (!canUseDOM) return {};

      var node = React.findDOMNode(this),
          scrollHt = node.scrollHeight,
          bodyIsOverflowing = this._bodyIsOverflowing,
          modalIsOverflowing = scrollHt > document.documentElement.clientHeight;

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
      var dialog = React.findDOMNode(this.refs.dialog),
          classes = this.props.attentionAnimation + " animated";

      dialog.className = dialog.className.replace(classes, "");
      dialog.offsetWidth;
    };

    return Modal;
  })(React.Component);

  // its easier to just wrap the whole component in another one for the Transition
  // That way we don't need to do checks for is dialog mounted, etc in the above, simplifying the logic
  return (function (_React$Component2) {
    function ModalPortal() {
      babelHelpers.classCallCheck(this, ModalPortal);

      if (_React$Component2 != null) {
        _React$Component2.apply(this, arguments);
      }
    }

    babelHelpers.inherits(ModalPortal, _React$Component2);
    ModalPortal.defaultProps = Modal.defaultProps;

    ModalPortal.prototype.render = function render() {
      var _props = this.props;
      var children = _props.children;
      var props = babelHelpers.objectWithoutProperties(_props, ["children"]);

      var getDialog = function (el) {
        return el.querySelectorAll(".modal-dialog")[0];
      };

      var show = !!props.show;

      var modal = React.createElement(
        Modal,
        babelHelpers._extends({}, props, { ref: "modal" }),
        children
      );

      return props.animate ? React.createElement(
        Fade,
        {
          in: show,
          transitioningNode: getDialog,
          transitionAppear: show,
          duration: Modal.TRANSITION_DURATION,
          unmountOnExit: true
        },
        modal
      ) : show && modal;
    };

    return ModalPortal;
  })(React.Component);
})();

var ModalTrigger = createOverlay(function (props) {
  return React.createElement(
    Modal,
    props,
    props.children
  );
});

ModalTrigger.Body = Body;
ModalTrigger.Header = Header;
ModalTrigger.Title = Title;
ModalTrigger.Footer = Footer;
ModalTrigger.Dismiss = Dismiss;

ModalTrigger.BaseModal = Modal;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

module.exports = ModalTrigger;