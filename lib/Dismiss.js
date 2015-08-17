var babelHelpers = require("./util/babelHelpers.js");
var React = require("react");

var chain = function (a, b) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    a && a.apply(undefined, args);
    b && b.apply(undefined, args);
  };
};

var Dismiss = (function (_React$Component) {
  function Dismiss() {
    babelHelpers.classCallCheck(this, Dismiss);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  babelHelpers.inherits(Dismiss, _React$Component);
  Dismiss.propTypes = {
    component: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func])
  };
  Dismiss.defaultProps = {
    component: "button" };
  Dismiss.contextTypes = {
    onModalHide: React.PropTypes.func
  };

  Dismiss.prototype.render = function render() {
    var _props = this.props;
    var Tag = _props.component;
    var children = _props.children;
    var props = babelHelpers.objectWithoutProperties(_props, ["component", "children"]);

    return React.createElement(
      Tag,
      babelHelpers._extends({}, props, { onClick: chain(props.onClick, this.context.onModalHide) }),
      children
    );
  };

  return Dismiss;
})(React.Component);

module.exports = Dismiss;