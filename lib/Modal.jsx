"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    activeElement = require("react/lib/getActiveElement"),
    canUseDOM = require("dom-helpers/util/inDOM"),
    Transition = require("./Transition"),
    Body = require("./Body"),
    Header = require("./Header"),
    Title = require("./Title"),
    Footer = require("./Footer"),
    Dismiss = require("./Dismiss"),
    createOverlay = require("./createOverlay"),
    contains = require("dom-helpers/query/contains"),
    classes = require("dom-helpers/class"),
    events = require("dom-helpers/events"),
    scrollbarWidth = require("dom-helpers/util/scrollbarSize"),
    css = require("dom-helpers/style"),
    cn = require("classnames");

var stack = [];

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
      onHide: React.PropTypes.func
    };
    Modal.defaultProps = {
      backdrop: true,
      keyboard: true,
      animate: true,
      attentionAnimation: "shake"
    };
    Modal.childContextTypes = {
      onModalHide: React.PropTypes.func
    };

    Modal.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      this._needsStyleUpdate = nextProps.backdrop !== this.props.backdrop;
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

      this._removeFocusListener = onFocus(this._focus.bind(this));

      if (this.props.backdrop && this.props.show) this.iosClickHack();

      this.setState(this._getStyles(), function () {
        return _this.focus();
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

      return React.createElement(
        "div",
        babelHelpers._extends({}, props, {
          ref: "modal",
          tabIndex: "-1",
          role: "dialog",
          style: dialog,
          className: cn(className, { modal: true }),
          onClick: this.props.backdrop ? function (e) {
            return _this.handleBackdropClick(e);
          } : null }),
        this.props.backdrop && this.renderBackdrop(backdrop),
        React.createElement(
          "div",
          {
            key: "modal",
            ref: "dialog",
            className: cn("modal-dialog", this.state.classes)
          },
          React.createElement(
            "div",
            { className: "modal-content" },
            children
          )
        )
      );
    };

    Modal.prototype.renderBackdrop = function renderBackdrop(style) {
      var _this = this;

      return React.createElement(
        Transition,
        {
          className: cn({ fade: this.props.animate }),
          in: this.props.show },
        React.createElement("div", {
          className: cn("modal-backdrop"),
          ref: "backdrop",
          key: "backdrop",
          style: style,
          onClick: function (e) {
            return _this.handleBackdropClick(e);
          } })
      );
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
          paddingRight: bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth : void 0,
          paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth : void 0
        },
        backdrop: {
          height: scrollHt
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
    var _class = function () {
      babelHelpers.classCallCheck(this, _class);

      if (_React$Component2 != null) {
        _React$Component2.apply(this, arguments);
      }
    };

    babelHelpers.inherits(_class, _React$Component2);

    _class.prototype.render = function render() {
      var _props = this.props;
      var onTransitionIn = _props.onTransitionIn;
      var onTransitionedIn = _props.onTransitionedIn;
      var onTransitionOut = _props.onTransitionOut;
      var onTransitionedOut = _props.onTransitionedOut;
      var props = babelHelpers.objectWithoutProperties(_props, ["onTransitionIn", "onTransitionedIn", "onTransitionOut", "onTransitionedOut"]);

      var transitionProps = { onTransitionIn: onTransitionIn, onTransitionedIn: onTransitionedIn, onTransitionOut: onTransitionOut, onTransitionedOut: onTransitionedOut };

      var getDialog = function (el) {
        return el.querySelectorAll(".modal-dialog")[0];
      };

      return React.createElement(
        Transition,
        babelHelpers._extends({}, transitionProps, {
          in: props.show,
          transitioningNode: getDialog,
          className: cn({ fade: !props.animate })
        }),
        React.createElement(
          Modal,
          this.props,
          this.props.children
        )
      );
    };

    return _class;
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

module.exports = ModalTrigger;