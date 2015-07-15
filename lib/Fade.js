var babelHelpers = require("./util/babelHelpers.js");
var React = babelHelpers.interopRequire(require("react"));
var Transition = babelHelpers.interopRequire(require("./Transition"));

var Fade = (function (_React$Component) {
  function Fade(props, context) {
    babelHelpers.classCallCheck(this, Fade);

    _React$Component.call(this, props, context);
  }

  babelHelpers.inherits(Fade, _React$Component);

  Fade.prototype.render = function render() {
    return React.createElement(
      Transition,
      babelHelpers._extends({}, this.props, {
        in: this.props.in,
        className: "fade",
        enteredClassName: "in",
        enteringClassName: "in"
      }),
      this.props.children
    );
  };

  return Fade;
})(React.Component);

module.exports = Fade;