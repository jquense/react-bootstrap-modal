"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    transitionEnd = require("dom-helpers/transition/end"),
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
    duration: null,
    transitioningNode: function () {},
    onTransitionIn: function () {},
    onTransitionedIn: function () {},
    onTransitionOut: function () {},
    onTransitionedOut: function () {}
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
    var _this = this;

    var node = React.findDOMNode(this);

    node = this.props.transitioningNode(node) || node;

    this.props.onTransitionIn();
    this.currentlyTransitioningKeys[key] = true;

    node.offsetWidth;
    this.setState({ in: true });

    transitionEnd(node, function () {
      _this.currentlyTransitioningKeys[key] = false;

      if (!_this.props.children || _this.props.children.key !== key) return _this.performLeave(key);

      _this.props.onTransitionedIn();
    }, this.props.duration);
  };

  Transition.prototype.performLeave = function performLeave(key) {
    var _this = this;

    var node = React.findDOMNode(this);

    node = this.props.transitioningNode(node) || node;

    this.props.onTransitionOut();
    this.currentlyTransitioningKeys[key] = true;

    this.setState({ in: false });

    transitionEnd(node, function () {
      _this.currentlyTransitioningKeys[key] = false;

      _this.setState({ child: null });
      _this.props.onTransitionedOut();
    }, this.props.duration);
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

function result(prop) {
  return typeof prop === "function" ? prop() : prop;
}