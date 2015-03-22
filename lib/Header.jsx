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
  ModalHeader.defaultProps = {
    closeButton: false };
  ModalHeader.contextTypes = {
    onModalHide: React.PropTypes.func
  };

  ModalHeader.prototype.render = function render() {
    var child = React.Children.only(this.props.children);

    var title = React.cloneElement(child, {
      className: cn(child.className, "modal-title")
    });

    return React.createElement(
      "div",
      babelHelpers._extends({}, this.props, {
        className: cn(this.props.className, "modal-header")
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
      title
    );
  };

  return ModalHeader;
})(React.Component);

module.exports = ModalHeader;