'use strict';
var $ = require('./dom')
  , el = document.createElement("div")
  , notSupported, endEvent
  , prefix = ''
  , transitions = {
      O:'otransitionend',
      Moz:'transitionend',
      Webkit:'webkitTransitionEnd'
    }

for(var vendor in transitions)
  if (el.style[vendor + 'TransitionProperty'] !== undefined) {
    prefix = '-' + vendor.toLowerCase() + '-'
    endEvent = transitions[vendor];
    break;
}  

if (!endEvent && el.style.transitionProperty !== undefined )
  endEvent = 'transitionend'

el = null;

module.exports = {

  support: !!endEvent,

  on: function(node, handler, duration) {
    var fakeEvent = { target: node, currentTarget: node }
      , fired;

    if(!!endEvent){
      node.addEventListener(endEvent, handler);
      setTimeout(function(){
        if (!fired) done(fakeEvent)
      }, duration || 2000)
    } else
      setTimeout(done.bind(null, fakeEvent), 0)

    function done(event) {
      if (event.target !== event.currentTarget) return
      fired = true
      event.target.removeEventListener(endEvent, done);
      handler.call(this)
    }
  }
}

