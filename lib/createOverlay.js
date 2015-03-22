"use strict";
var babelHelpers = require("./util/babelHelpers.js");
var React = require("react"),
    Layer = require("react-layer");

module.exports = function (render) {
  return (function (_React$Component) {
    var _class = function () {
      babelHelpers.classCallCheck(this, _class);

      if (_React$Component != null) {
        _React$Component.apply(this, arguments);
      }
    };

    babelHelpers.inherits(_class, _React$Component);
    _class.propTypes = {
      container: React.PropTypes.any
    };

    _class.prototype.componentWillUnmount = function componentWillUnmount() {
      this._layer.destroy();
      this._layer = null;
    };

    _class.prototype.componentDidUpdate = function componentDidUpdate() {
      this._renderOverlay();
    };

    _class.prototype.componentDidMount = function componentDidMount() {
      this._renderOverlay();
    };

    _class.prototype._renderOverlay = function _renderOverlay() {
      var _this = this;

      if (!this._layer) this._layer = new Layer(this.props.container || document.body, function () {
        return _this._child;
      });

      this._layer.render();
    };

    _class.prototype.render = (function (_render) {
      var _renderWrapper = function render() {
        return _render.apply(this, arguments);
      };

      _renderWrapper.toString = function () {
        return _render.toString();
      };

      return _renderWrapper;
    })(function () {
      this._child = render(this.props);
      return null;
    });

    return _class;
  })(React.Component);
};