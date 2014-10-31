'use strict';

var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
var isArray = Array.isArray || function(arg) { return Object.prototype.toString.call(arg) === '[object Array]' }

module.exports = function(classes){
  var cls = []

  if( !isArray(classes))
    for(var k in classes)
       if( classes.hasOwnProperty(k) && !!classes[k] ) 
        cls.push(k) 

  return cls.join(' ').replace(rtrim, '')
}
