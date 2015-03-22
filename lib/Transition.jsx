"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    transitions = require("./transitions"),
    cn = require("classnames");

var Transition = (function (_React$Component) {
  function Transition(props, context) {
    babelHelpers.classCallCheck(this, Transition);

    _React$Component.call(this, props, context);

    this.currentlyTransitioningKeys = {};

    this.state = {
      action: "enter",
      child: props.in && props.children ? React.Children.only(props.children) : null
    };
  }

  babelHelpers.inherits(Transition, _React$Component);
  Transition.defaultProps = {
    in: false,
    onShow: function () {},
    onShown: function () {},
    onHide: function () {},
    onHidden: function () {}
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var state = {},
        child = this.state.child,
        nextChild = nextProps.children,
        childChanged = this._childChanged(this.props.children, nextChild),
        updated = nextProps.in !== this.props.in,
        animating;

    if (nextChild) child = nextChild;

    animating = child && this.currentlyTransitioningKeys[child.key];

    if ((updated || childChanged) && !animating) {
      child = this.current = child || nextChild;
      state.action = nextProps.in === true ? "enter" : "leave";
    }

    if (nextProps.in && child && child !== this.state.child) state.child = child;

    if (Object.keys(state).length) this.setState(state);
  };

  Transition.prototype._childChanged = function _childChanged(oldChild, newChild) {

    if (oldChild == null && newChild != null || oldChild != null && newChild == null) return true;

    return !(oldChild === newChild || oldChild.key === newChild.key);
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    var current = this.current,
        action = this.state.action;

    if (current) {
      this.current = null;

      if (action === "enter") this.performEnter(current.key);
      if (action === "leave") this.performLeave(current.key);
    }
  };

  Transition.prototype.componentDidMount = function componentDidMount() {
    var current = this.state.child,
        action = this.state.action;

    if (current) {
      if (action === "enter") this.performEnter(current.key);
      if (action === "leave") this.performLeave(current.key);
    }
  };

  Transition.prototype.performEnter = function performEnter(key) {
    var node = React.findDOMNode(this),
        done = this._handleDoneEntering.bind(this, key);

    this.props.onShow();
    this.currentlyTransitioningKeys[key] = true;

    node.offsetWidth;
    this.setState({ in: true });

    transitions.on(node, done, 300);
  };

  Transition.prototype._handleDoneEntering = function _handleDoneEntering(key) {
    this.currentlyTransitioningKeys[key] = false;

    if (!this.props.children || this.props.children.key !== key) return this.performLeave(key);

    this.props.onShown();
  };

  Transition.prototype.performLeave = function performLeave(key) {
    var node = React.findDOMNode(this),
        done = this._handleDoneLeaving.bind(this, key);

    this.props.onHide();
    this.currentlyTransitioningKeys[key] = true;

    this.setState({ in: false });

    transitions.on(node, done, 300);
  };

  Transition.prototype._handleDoneLeaving = function _handleDoneLeaving(key) {
    this.currentlyTransitioningKeys[key] = false;

    this.setState({ child: null });
    this.props.onHidden();
  };

  Transition.prototype.render = function render() {
    var child = this.state.child;

    if (!child) return null;

    return React.cloneElement(child, {
      className: cn(child.props.className, this.props.className, {
        in: this.state.in
      })
    });
  };

  return Transition;
})(React.Component);

module.exports = Transition;