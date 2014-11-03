/**
 * @jsx React.DOM
 */
'use strict';
var React = require('react')
  , extend = require('xtend')
  , cloneWithProps = require('../cloneWithProps')
  , transitions    = require('../transitions');

var fadeChild;

var FadeAnimation = React.createClass({

  getDefaultProps: function() {
    return {
      'in':     false, 
      animate:  true,
      onShow:   function(){},
      onShown:  function(){},
      onHide:   function(){},
      onHidden: function(){},
    };
  },

  getInitialState: function() {
    return {
      action: 'enter',
      child: (this.props.in && this.props.children) 
        ? React.Children.only(this.props.children)
        : null
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var state        = {}
      , child        = this.state.child
      , nextChild    = nextProps.children
      , childChanged = this._childChanged(this.props.children, nextChild)
      , updated      = (nextProps.in !== this.props.in)
      , animating, action;

    if(nextChild) 
      child = nextChild
    
    animating  = child && this.currentlyTransitioningKeys[child.key]

    if( (updated || childChanged) && !animating){
      child = this.current = child || nextChild
      state.action = (nextProps.in === true) ? 'enter' : 'leave'
    }

    if( nextProps.in && child && child !== this.state.child)
      state.child = child

    if ( !!Object.keys(state).length )
      this.setState(state);
  },

  _childChanged: function(oldChild, newChild){

    if( (oldChild == null && newChild != null) || (oldChild != null && newChild == null))
      return true

    return !(oldChild === newChild || oldChild.key === newChild.key)
  },

  componentWillMount: function() {
    this.currentlyTransitioningKeys = {};
  },

  componentDidUpdate: function() {
    var current = this.current
      , action = this.state.action;

    if (current) {
      this.current = null;

      if (action === 'enter') this.performEnter(current.key)
      if (action === 'leave') this.performLeave(current.key)
    }
  },

  componentDidMount: function() {
    var current = this.state.child
      , action  = this.state.action;

    if (current) {
      if (action === 'enter') this.performEnter(current.key)
      if (action === 'leave') this.performLeave(current.key)
    }
  },

  performEnter: function(key) {
    var node  = this.getDOMNode()
      , done = this._handleDoneEntering.bind(this, key);

    this.props.onShow() 
    this.currentlyTransitioningKeys[key] = true;

    if( this.props.animate && !hasClass(node, 'fade'))
      node.className += ' fade'
    
    node.offsetWidth
    node.className += ' in'

    this.props.animate 
      ? transitions.on(node, done, 300)
      : setTimeout(done, 0)
  },

  _handleDoneEntering: function(key) {
    this.currentlyTransitioningKeys[key] = false

    if (!this.props.children || this.props.children.key !== key) 
      return this.performLeave(key)
    
    this.props.onShown() 
  },

  performLeave: function(key) {
    var node = this.getDOMNode()
      , done = this._handleDoneLeaving.bind(this, key);

    this.props.onHide()
    this.currentlyTransitioningKeys[key] = true

    if( (!this.props.animate || hasClass(node, 'fade')) && hasClass(node, 'in')) {
      node.offsetWidth
      node.className = node.className.replace(/\bin\b/, '')
      
      this.props.animate 
        ? transitions.on(node, done, 300)
        : setTimeout(done, 0)
    }
  },

  _handleDoneLeaving: function(key) {    
    this.currentlyTransitioningKeys[key] = false

    this.setState({ child: null })
    this.props.onHidden() 
  },

  render: function() {
    return this.state.child // extend(this.props)
  }

})

module.exports = FadeAnimation;

function hasClass(n, c){
  return !!n.className.match(new RegExp('\\b' + c + '\\b'))
}