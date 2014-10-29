/** @jsx React.DOM */
var React = require('react')
  , BSModal = require('react-bootstrap/Modal')
  , extend = require('xtend')
  , $ = require('./dom')
  , zIndexFactor
  , baseIndex = {}
  , stack = [];

var getZIndex = (function () {
  var modal = document.createElement("div")
    , backdrop = document.createElement("div");

  modal.className = 'modal hide'
  backdrop.className = 'modal-backdrop hide'

  document.body.appendChild(modal)
  document.body.appendChild(backdrop)

  baseIndex.modal = +$.css(modal, 'z-index')
  baseIndex.backdrop = +$.css(backdrop, 'z-index')
  zIndexFactor = baseIndex.modal - baseIndex.backdrop

  document.body.removeChild(modal)
  document.body.removeChild(backdrop) 

  return function (type) {
    return baseIndex[type] + (zIndexFactor * stack.length);
  }
}())
/**
 * @jsx React.DOM
 */

var React = require('react')
  , focusEvent = 'onfocusin' in window ? 'focusin' : 'focus';

var Modal = React.createClass({

  componentDidMount: function() {
    var el = this.getDOMNode()
      , self = this
      , idx = stack.indexOf(el)

    if(idx === -1) stack.push(el)
    this.fixBackdrop()

    $.on(document, focusEvent, this._focus, true)

    setTimeout(function(){ self.focus() }, 0)
  },

  componentWillUnmount: function() {
    var idx = stack.indexOf(this.getDOMNode())

    if(idx !== -1) stack.splice(idx, 1)

    $.off(document, focusEvent, this._focus, true)
  },

  render: function() {
    var style = { zIndex: getZIndex('modal') }
      , props = extend(this.props, { style: style });
    
    props.ref = "modal"

    return BSModal(props, this.props.children);
  },

  _focus: function(e){
    var self = this
      , el = this.getDOMNode()
    
    setTimeout(function(){
      if (!isAmericasTopModal(el)) 
        e.preventDefault()
      
      else if ( el !== document.activeElement && !$.contains(el, document.activeElement)) 
        self.focus()

    }, 0)    
  },

  focus: function(){
    this.refs.modal.refs.modal.getDOMNode().focus()
  },

  fixBackdrop: function(){
    //DON'T LOOK AT ME
    this.refs.modal.refs.backdrop.getDOMNode().style.zIndex = getZIndex('backdrop')
  }

});

module.exports = Modal;

function isAmericasTopModal(modal){
  return !!stack.length && stack[stack.length - 1] === modal
}