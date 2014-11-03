'use strict';
var React = require('react');

module.exports = Layer;

function Layer(container, render){
  this._container = container
  this._render = render
}

Layer.prototype = {

  constructor: Layer,

  render: function(){
    if (!this._mountPoint)
      this._createMountPount();

    React.render(this._render(), this._mountPoint);
  },

  unmount: function(){
    if(!this._mountPoint) return

    React.unmountComponentAtNode(this._mountPoint);
  },

  destroy: function(){
    this.unmount()

    if (this._mountPoint)
      this._container.removeChild(this._mountPoint)
  },

  _createMountPount:  function () {
    this._mountPoint = document.createElement('div');
    this._container.appendChild(this._mountPoint);
  }
}
