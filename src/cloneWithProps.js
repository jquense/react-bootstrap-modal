"use strict";
var React = require('react') ///lib/ReactElement
  , extend = require('xtend')
  , hasOwn = Object.prototype.hasOwnProperty
  , RESERVED = {
      className:  resolve(joinClasses),
      children:   function(){},
      key:        function(){},
      ref:        function(){},
      style:      resolve(extend)
    };


module.exports = function cloneWithProps(child, props) {
  var newProps = mergeProps(extend(props), child.props);

  if (!hasOwn.call(newProps, 'children') && hasOwn.call(child.props, 'children'))
    newProps.children = child.props.children;

  return React.createElement(child.type, newProps);
}

//mutates first arg
function mergeProps(source, target) {
  for (var key in target) {
    if (hasOwn.call(RESERVED, key) )
      RESERVED[key](source, target[key], key)

    else if ( !hasOwn.call(source, key) )
      source[key] = target[key];
  }
  return source
}

function resolve(fn){
  return function(src, value, key){
    if( !hasOwn.call(src, key)) src[key] = value
    else src[key] = fn(src[key], value)
  }
}

function joinClasses(a, b){
  if ( !a ) return b || ''
  return a + (b ? ' ' + b : '')
}
