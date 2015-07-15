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

  ModalFooter.prototype.render = function render() {
    return React.createElement(
      "div",
      babelHelpers._extends({}, this.props, { className: cn(this.props.className, this.props.modalPrefix + "-footer") }),
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

ModalFooter.defaultProps = {
  modalPrefix: "modal"
};

module.exports = ModalFooter;