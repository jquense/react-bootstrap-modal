'use strict';
var $ = require('./dom')
  , baseIndex = {}
  , stack = []
  , zIndexFactor = 10;

module.exports = {

  componentDidMount: function() {
    var idx = stack.indexOf(this)

    if(!stack.length) document.body.className += ' modal-open'
    if(idx === -1) stack.push(this)
  },

  componentWillUnmount: function() {
    var idx = stack.indexOf(this)

    if(idx !== -1) stack.splice(idx, 1)
      
    if(!stack.length)
      document.body.className = document.body.className.replace(/\bmodal-open\b/, '')
  },

  isTopModal: function isAmericasTopModal(modal){
    return !!stack.length && stack[stack.length - 1] === modal
  }

}