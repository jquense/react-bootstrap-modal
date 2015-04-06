var babelHelpers = require("./util/babelHelpers.js");

var React = require("react");
var cn = require("classnames");

var ModalBody = (function (_React$Component) {
  function ModalBody() {
    babelHelpers.classCallCheck(this, ModalBody);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  babelHelpers.inherits(ModalBody, _React$Component);

  ModalBody.prototype.render = function render() {
    return React.createElement(
      "div",
      babelHelpers._extends({}, this.props, { className: cn(this.props.className, "modal-body") }),
      this.props.children
    );
  };

  return ModalBody;
})(React.Component);

module.exports = ModalBody;