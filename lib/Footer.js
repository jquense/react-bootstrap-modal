var babelHelpers = require("./util/babelHelpers.js");
var React = require("react");
var cn = require("classnames");

var ModalFooter = (function (_React$Component) {
  function ModalFooter() {
    babelHelpers.classCallCheck(this, ModalFooter);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  babelHelpers.inherits(ModalFooter, _React$Component);

  ModalFooter.getDefaultPrefix = function getDefaultPrefix() {
    return "modal";
  };

  ModalFooter.prototype.render = function render() {
    var prefix = this.props.modalPrefix || ModalFooter.getDefaultPrefix();

    return React.createElement(
      "div",
      babelHelpers._extends({}, this.props, { className: cn(this.props.className, prefix + "-footer") }),
      this.props.children
    );
  };

  return ModalFooter;
})(React.Component);

ModalFooter.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalPrefix: React.PropTypes.string
};

module.exports = ModalFooter;