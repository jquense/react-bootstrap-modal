'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var chain = function chain(a, b) {
  return function () {
    a && a.apply(undefined, arguments);
    b && b.apply(undefined, arguments);
  };
};

var Dismiss = (function (_React$Component) {
  _inherits(Dismiss, _React$Component);

  function Dismiss() {
    _classCallCheck(this, Dismiss);

    _React$Component.apply(this, arguments);
  }

  Dismiss.prototype.render = function render() {
    var _props = this.props;
    var Tag = _props.component;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['component', 'children']);

    return React.createElement(
      Tag,
      _extends({}, props, { onClick: chain(props.onClick, this.context.onModalHide) }),
      children
    );
  };

  _createClass(Dismiss, null, [{
    key: 'propTypes',
    value: {
      component: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func])
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      component: 'button'
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      onModalHide: React.PropTypes.func
    },
    enumerable: true
  }]);

  return Dismiss;
})(React.Component);

module.exports = Dismiss;