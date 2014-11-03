/**
 * @jsx React.DOM
 */
'use strict';
var React = require('react')
  , extend = require('xtend')
  , cloneWithProps = require('./cloneWithProps')
  , transitions = require('./transitions');

var fadeChild;

var FadeAnimation = React.createClass({

  getDefaultProps: function() {
    return {
      'in': false, 
      component: React.DOM.span,

      onAnimating: function(){},
      onAnimate:   function(){}
    };
  },

  getInitialState: function() {
    return {
      child: this.props.children
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var child
      , nextChild = nextProps.children
      , prevChild = this.state.child
      , leaving   = prevChild != null 
          && this.currentlyTransitioningKeys[prevChild.key]
      , entering = nextChild != null 
          && this.currentlyTransitioningKeys[nextChild.key];

    if( nextChild == null && prevChild != null && !leaving)
      child = this.leaving = prevChild

    else if( nextChild != null && prevChild == null && !entering)
      child = this.entering = nextChild

    if( child && child !== this.state.child)
      this.setState({
        child: child
      });
  },

  componentWillMount: function() {
    this.currentlyTransitioningKeys = {};
  },

  componentDidUpdate: function() {
    var entering = this.entering
      , leaving = this.leaving;

    this.props.onAnimating();
    this.entering = null;
    this.leaving = null;

    if (entering) this.performEnter(entering.key)
    if (leaving)  this.performLeave(leaving.key)
  },

  performEnter: function(key) {
    var component = this.refs[key];

    this.currentlyTransitioningKeys[key] = true;

    if (component.componentWillEnter) 
      component.componentWillEnter(this._handleDoneEntering.bind(this, key));
    else 
      this._handleDoneEntering(key);
  },

  _handleDoneEntering: function(key) {
    var component = this.refs[key];

    if (component.componentDidEnter) 
      component.componentDidEnter();
    
    delete this.currentlyTransitioningKeys[key];

    if (!this.props.children || this.props.children.key !== key) 
      return this.performLeave(key); // This was removed before it had fully entered. Remove it.
    
    this.props.onAnimate() 
  },

  performLeave: function(key) {
    var component = this.refs[key];

    this.currentlyTransitioningKeys[key] = true;

    if (component.componentWillLeave) 
      component.componentWillLeave(this._handleDoneLeaving.bind(this, key));
    else 
      this._handleDoneLeaving(key);
  },

  _handleDoneLeaving: function(key) {
    var component = this.refs[key];

    if (component.componentDidLeave) 
      component.componentDidLeave();
    
    delete this.currentlyTransitioningKeys[key];

    this.setState({ child: null });
    this.props.onAnimate() 
  },

  render: function() {
    var childrenToRender = {}
      , child = this.state.child;

    if( child == null) return null

    childrenToRender[child.key] = cloneWithProps(
      React.createElement(fadeChild, null, child),
      { ref: child.key }
    );

    return this.props.in ? this.props.component(extend(this.props), childrenToRender) : null;
  },

});

module.exports = FadeAnimation;


fadeChild = React.createClass({

  componentWillEnter: function(done) {
    var node  = this.getDOMNode();

    if( node.className.match(/\bfade\b/)){
      node.clientLeft
      node.className += ' in'
      transitions.on(node, done, 300)
    }
  },

  componentWillLeave: function(done) {
    var node  = this.getDOMNode();

    if( node.className.match(/\bfade\b/) && node.className.match(/\bin\b/)) {
      node.clientLeft
      node.className = node.className.replace(/\bin\b/, '')
      transitions.on(node, done, 300)
    }
  },

  render: function() {
    return React.Children.only(this.props.children);
  }
});
