var babelHelpers = require("./util/babelHelpers.js");
var React = require("react");
var cn = require("classnames");

var ModalTitle = (function (_React$Component) {
  function ModalTitle() {
    babelHelpers.classCallCheck(this, ModalTitle);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  babelHelpers.inherits(ModalTitle, _React$Component);

  ModalTitle.prototype.render = function render() {
    return React.createElement(
      "h4",
      babelHelpers._extends({}, this.props, { className: cn(this.props.className, "modal-title") }),
      this.props.children
    );
  };

  return ModalTitle;
})(React.Component);

module.exports = ModalTitle;