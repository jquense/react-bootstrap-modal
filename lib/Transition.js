"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = babelHelpers.interopRequire(require("react"));
var transitionEnd = babelHelpers.interopRequire(require("dom-helpers/transition/end"));
var classnames = babelHelpers.interopRequire(require("classnames"));

function omit(obj, keys) {
  var included = Object.keys(obj).filter(function (k) {
    return keys.indexOf(k) === -1;
  });
  var newObj = {};

  included.forEach(function (key) {
    return newObj[key] = obj[key];
  });
  return newObj;
}

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
var triggerBrowserReflow = function (node) {
  return node.offsetHeight;
}; //eslint-disable-line no-unused-expressions

var Transition = (function (_React$Component) {
  function Transition(props, context) {
    babelHelpers.classCallCheck(this, Transition);

    _React$Component.call(this, props, context);

    this.state = {
      in: !props.in,
      transitioning: false
    };

    this.needsTransition = true;
  }

  babelHelpers.inherits(Transition, _React$Component);

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.in !== this.props.in) {
      this.needsTransition = true;
    }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    this.processChild();
  };

  Transition.prototype.componentWillMount = function componentWillMount() {
    this._mounted = true;

    if (!this.props.transitionAppear) {
      this.needsTransition = false;
      this.setState({ in: this.props.in });
    }
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this._mounted = false;
  };

  Transition.prototype.componentDidMount = function componentDidMount() {
    if (this.props.transitionAppear) {
      this.processChild();
    }
  };

  Transition.prototype.processChild = function processChild() {
    var needsTransition = this.needsTransition;
    var enter = this.props.in;

    if (needsTransition) {
      this.needsTransition = false;
      this[enter ? "performEnter" : "performLeave"]();
    }
  };

  Transition.prototype.performEnter = function performEnter() {
    var _this = this;

    var maybeNode = React.findDOMNode(this);

    var enter = function (node) {
      var transitionNode = _this.props.transitioningNode(node) || node;

      _this.props.onEnter(node);

      _this.safeSetState({ in: true, transitioning: true, needInitialRender: false }, function () {

        _this.props.onEntering(node);

        transitionEnd(transitionNode, function () {
          if (_this.state.in) {
            _this.safeSetState({
              transitioning: false
            }, function () {
              return _this.props.onEntered(node);
            });
          }
        }, _this.props.duration);
      });
    };

    if (maybeNode) {
      enter(maybeNode);
    } else if (this.props.unmountOnExit) {
      this._ensureNode(enter);
    }
  };

  Transition.prototype.performLeave = function performLeave() {
    var _this = this;

    var node = React.findDOMNode(this);
    var transitionNode = this.props.transitioningNode(node) || node;

    this.props.onExit(node);

    this.setState({ in: false, transitioning: true }, function () {
      _this.props.onExiting(node);

      transitionEnd(transitionNode, function () {
        if (!_this.state.in) {
          _this.safeSetState({ transitioning: false }, function () {
            return _this.props.onExited(node);
          });
        }
      }, _this.props.duration);
    });
  };

  Transition.prototype._ensureNode = function _ensureNode(callback) {
    var _this = this;

    this.setState({ needInitialRender: true }, function () {
      var node = React.findDOMNode(_this);

      triggerBrowserReflow(node);

      callback(node);
    });
  };

  Transition.prototype.safeSetState = function safeSetState(newState, cb) {
    if (this._mounted) {
      this.setState(newState, cb);
    }
  };

  Transition.prototype.render = function render() {
    var childProps = omit(this.props, Object.keys(Transition.propTypes).concat("children"));

    var child = this.props.children;
    var starting = this.state.needInitialRender;
    var out = !this.state.in && !this.state.transitioning;

    if (!child || this.props.unmountOnExit && out && !starting) {
      return null;
    }

    var classes = "";

    // using `classnames()` here causes a subtle bug,
    // hence the verbose if/else if sequence.
    if (this.state.in && !this.state.transitioning) {
      classes = this.props.enteredClassName;
    } else if (this.state.in && this.state.transitioning) {
      classes = this.props.enteringClassName;
    } else if (!this.state.in && !this.state.transitioning) {
      classes = this.props.exitedClassName;
    } else if (!this.state.in && this.state.transitioning) {
      classes = this.props.exitingClassName;
    }

    return React.cloneElement(child, babelHelpers._extends({}, childProps, {
      className: classnames(child.props.className, this.props.className, classes)
    }));
  };

  return Transition;
})(React.Component);

Transition.propTypes = {
  /**
   * Triggers the Enter or Exit animation
   */
  in: React.PropTypes.bool,

  /**
   * Specify whether the transitioning component should be unmounted (removed from the DOM) once the exit animation finishes.
   */
  unmountOnExit: React.PropTypes.bool,

  /**
   * Specify whether transitions should run when the Transition component mounts.
   */
  transitionAppear: React.PropTypes.bool,

  /**
   * Provide the duration of the animation in milliseconds, used to ensure that finishing callbacks are fired even if the
   * original browser transition end events are canceled.
   */
  duration: React.PropTypes.number,

  /**
   * A css class or classes applied once the Component has exited.
   */
  exitedClassName: React.PropTypes.string,
  /**
   * A css class or classes applied while the Component is exiting.
   */
  exitingClassName: React.PropTypes.string,
  /**
   * A css class or classes applied once the Component has entered.
   */
  enteredClassName: React.PropTypes.string,
  /**
   * A css class or classes applied while the Component is entering.
   */
  enteringClassName: React.PropTypes.string,

  /**
   * A function that returns the DOM node to animate. This Node will have the transition classes applied to it.
   * When left out, the Component will use its immediate child.
   *
   * @private
   */
  transitioningNode: React.PropTypes.func,

  /**
   * A callback fired just before the "entering" classes are applied
   */
  onEnter: React.PropTypes.func,
  /**
   * A callback fired just after the "entering" classes are applied
   */
  onEntering: React.PropTypes.func,
  /**
   * A callback fired after "enter" classes are applied
   */
  onEntered: React.PropTypes.func,
  /**
   * A callback fired after "exiting" classes are applied
   */
  onExit: React.PropTypes.func,
  /**
   * A callback fired after "exiting" classes are applied
   */
  onExiting: React.PropTypes.func,
  /**
   * A callback fired after "exit" classes are applied
   */
  onExited: React.PropTypes.func
};

// name the function so it is clearer in the documentation
var noop = function () {};

Transition.defaultProps = {
  in: false,
  duration: 300,
  unmountOnExit: false,
  transitionAppear: false,
  transitioningNode: noop,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

module.exports = Transition;