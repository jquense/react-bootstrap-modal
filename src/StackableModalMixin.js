'use strict';
var stack = [];

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

  isTopModal: function isAmericasTopModal(modal){
    return !!stack.length && stack[stack.length - 1] === modal
  }

}