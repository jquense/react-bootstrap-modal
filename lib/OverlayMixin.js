'use strict';
var React = require('react')
  , Layer = require('./Layer');

module.exports = {

  componentWillUnmount: function () {
    this._layer.destroy()
    this._layer = null
  },

  componentDidUpdate: function () {
    this._renderOverlay();
  },

  componentDidMount: function () {
    this._renderOverlay();
  },

  _renderOverlay: function () {
    if (!this._layer)
      this._layer = new Layer(this.props.container || document.body, this.renderOverlay)

    this._layer.render()
  }

};
