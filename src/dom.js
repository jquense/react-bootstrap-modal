"use strict";

var el = document.createElement("div");

var DOM = module.exports = {

  css: function(node, property, value){
      var css = '', val
        , properties = property;

      if ( typeof property === 'string') {
        if ( value === undefined)
          return node.style[camelize(property)] || getComputedStyle(node).getPropertyValue(property)
        else
          (properties = {})[property] = value
      }

      for(var key in properties){
        val = properties[key]
        if(properties.hasOwnProperty(key)){
          !val && val !== 0
            ? node.style.removeProperty(dasherize(key))
            : (css += dasherize(key) + ':' + val + ';')
        }
      }

      node.style.cssText += ';' + css
  },

  contains: (function(){
    var root = document.documentElement

    return (root && root.contains)
      ? function(context, node){ return context.contains(node); }
      : (root && root.compareDocumentPosition)
          ? function(context, node){
            return context === node || !!(context.compareDocumentPosition(node) & 16);
          }
          : function(context, node){
            if (node) do {
              if (node === context) return true;
            } while ((node = node.parentNode));

            return false;
          }
  })(),

  on: (function(){
    if(el.addEventListener) 
      return function eventListenerOn(node, eventName, handler, capture){ 
        node.addEventListener(eventName, handler, capture === true); 
      }

    else if (el.attachEvent)
      return function attachEventOn(node, eventName, handler){ 
        node.attachEvent('on' + eventName, handler); 
      }

    return function oldSkoolOn(node, eventName, handler){ 
      node['on' + eventName] = handler; 
    }

  }()),

  off: (function(){
    if(el.addEventListener) 
      return function eventListenerOff(node, eventName, handler, capture){ 
        node.removeEventListener(eventName, handler, capture === true); 
      }

    else if (el.attachEvent)
      return function attachEventOff(node, eventName, handler){ 
        node.detachEvent('on' + eventName, handler); 
      }

    return function oldSkoolOff(node, eventName){ 
      node['on' + eventName] = null; 
    }

  }()),

  trigger: function(node, type){
    var event = document.createEvent('Events')
    event.initEvent(type, true, true)
    node.dispatchEvent(event);
  }

}


function camelize(str){
  return str.replace(/-+(.)?/g, function(match, chr){ return chr ? chr.toUpperCase() : '' })
}

function dasherize(str) {
  return str.replace(/[A-Z]/g, function(char, index) {
    return (index !== 0 ? '-' : '') + char.toLowerCase();
  });
}

function getComputedStyle(node) {
  return node.ownerDocument.defaultView.opener
    ? node.ownerDocument.defaultView.getComputedStyle( node, null )
    : window.getComputedStyle(node, null);
}
