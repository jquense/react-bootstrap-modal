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

  getZIndex: (function () {
    var modal = document.createElement("div")
      , backdrop = document.createElement("div");

    modal.className = 'modal hide'
    backdrop.className = 'modal-backdrop hide'

    document.body.appendChild(modal)
    document.body.appendChild(backdrop)

    baseIndex.modal    = +$.css(modal, 'z-index')
    baseIndex.backdrop = +$.css(backdrop, 'z-index')
    zIndexFactor = baseIndex.modal - baseIndex.backdrop

    document.body.removeChild(modal)
    document.body.removeChild(backdrop) 

    return function (type) {
      return baseIndex[type] + (zIndexFactor * stack.length);
    }
  }()),

  isTopModal: function isAmericasTopModal(modal){
    return !!stack.length && stack[stack.length - 1] === modal
  }

}