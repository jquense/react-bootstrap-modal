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

  ModalTitle.getDefaultPrefix = function getDefaultPrefix() {
    return "modal";
  };

  ModalTitle.prototype.render = function render() {
    var prefix = this.props.modalPrefix || ModalTitle.getDefaultPrefix();

    return React.createElement(
      "h4",
      babelHelpers._extends({}, this.props, { className: cn(this.props.className, prefix + "-title") }),
      this.props.children
    );
  };

  return ModalTitle;
})(React.Component);

ModalTitle.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalPrefix: React.PropTypes.string
};

module.exports = ModalTitle;