var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    cn = require("classnames"),
    Dismiss = require("./Dismiss");

var ModalHeader = (function (_React$Component) {
  function ModalHeader() {
    babelHelpers.classCallCheck(this, ModalHeader);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  babelHelpers.inherits(ModalHeader, _React$Component);
  ModalHeader._isModalHeader = true;

  ModalHeader.getDefaultPrefix = function getDefaultPrefix() {
    return "modal";
  };

  ModalHeader.defaultProps = {
    closeButton: false };
  ModalHeader.contextTypes = {
    onModalHide: React.PropTypes.func
  };

  ModalHeader.prototype.render = function render() {
    var prefix = this.props.modalPrefix || ModalHeader.getDefaultPrefix();

    return React.createElement(
      "div",
      babelHelpers._extends({}, this.props, {
        className: cn(this.props.className, prefix + "-header")
      }),
      this.props.closeButton && React.createElement(
        Dismiss,
        {
          className: "close",
          "aria-label": this.props["aria-label"] || "Close Modal",
          style: { marginTop: -2 }
        },
        React.createElement(
          "span",
          { "aria-hidden": "true" },
          "×"
        )
      ),
      this.props.children
    );
  };

  return ModalHeader;
})(React.Component);

module.exports = ModalHeader;