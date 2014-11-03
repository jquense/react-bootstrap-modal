'use strict';
var $ = require('./dom')
  , baseIndex = {}
  , stack = []
  , zIndexFactor = 10;

module.exports = {

  componentDidMount: function() {
    var idx = stack.indexOf(this.getDOMNode())

    if(!stack.length) document.body.className += ' modal-open'
    if(idx === -1) stack.push(this.getDOMNode())
  },

  componentWillUnmount: function() {
    var idx = stack.indexOf(this.getDOMNode())

    if(idx !== -1) stack.splice(idx, 1)
      
    if(!stack.length)
      document.body.className = document.body.className.replace(/\bmodal-open\b/, '')
  },

  // getZIndex: (function () {
  //   var modal = document.createElement("div");

  //   modal.className = 'modal hidden'

  //   document.body.appendChild(modal)
  //   baseIndex.modal = +$.css(modal, 'z-index')

  //   document.body.removeChild(modal)

  //   return function (type) {
  //     var len = stack.length === 1 ? 0 : stack.length
  //     return baseIndex[type] + (zIndexFactor * len);
  //   }
  // }()),

  isTopModal: function isAmericasTopModal(modal){
    return !!stack.length && stack[stack.length - 1] === modal
  }

}