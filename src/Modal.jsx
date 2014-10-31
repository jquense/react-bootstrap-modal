// The MIT License (MIT)
// Copyright (c) 2014 Stephen J. Collings, Matthew Honnibal, Pieter Vanderwerff
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the &quot;Software&quot;), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


/** @jsx React.DOM */
var React = require('react')
  , extend = require('xtend')
  , cx = require('./cx')
  , $ = require('./dom');

var focusEvent = 'onfocusin' in window ? 'focusin' : 'focus';


var Modal = React.createClass({

  displayName: 'Modal',

  mixins: [ 
    require('./FadeMixin'),
    require('./StackableModalMixin') 
  ],

  propTypes: {
    title: React.PropTypes.renderable,
    backdrop: React.PropTypes.oneOf(['static', true, false]),
    keyboard: React.PropTypes.bool,
    closeButton: React.PropTypes.bool,
    animation: React.PropTypes.bool,
    onRequestHide: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      backdrop:    true,
      keyboard:    true,
      animation:   true,
      closeButton: true
    };
  },

  render: function () {
    var modalStyle = { display: 'block', zIndex: this.getZIndex('modal') }
      , classes = {
          modal: true,
          fade:  this.props.animation,
          'in':  !this.props.animation || !document.querySelectorAll
        };

    var Modal = this.transferPropsTo(
      <div ref='modal'
        tabIndex='-1'
        title={null} 
        role='dialog' 
        style={modalStyle}
        className={cx(classes)}
        onClick={this.props.backdrop === true ? this.handleBackdropClick : null}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            { this.props.title ? this.renderHeader() : null }
            { this.props.children }
          </div>
        </div>
      </div>
    );

    return this.props.backdrop 
      ? this.renderBackdrop(Modal) 
      : Modal;
  },

  renderBackdrop: function (Modal) {
    var onClick
      , style = { zIndex: this.getZIndex('backdrop')}
      , classes = {
          'modal-backdrop': true,
          'fade': this.props.animation,
          'in':   !this.props.animation || !document.querySelectorAll
        };

    onClick = this.props.backdrop === true 
            ? this.handleBackdropClick 
            : null;

    return (
      <div> 
        <div className={cx(classes)} ref="backdrop" onClick={onClick} style={style}/>
        {Modal}
      </div>
    );
  },

  renderHeader: function () {
    var closeButton;
    if (this.props.closeButton) {
      closeButton = (
        <button type="button" className="close" aria-hidden="true" onClick={this.props.onRequestHide}>{"×"}</button>
      );
    }

    return (
      <div className="modal-header"> 
        closeButton
        { this.renderTitle() }
      </div>
    );
  },

  renderTitle: function () {
    return (
      React.isValidComponent(this.props.title) 
        ? this.props.title 
        : <h4 className="modal-title">this.props.title</h4>
    );
  },

  _focus: function(e){
    var self = this
      , el = this.getDOMNode()
    
    setTimeout(function(){
      if (!self.isTopModal(el)) 
        e.preventDefault()
      
      else if ( el !== document.activeElement && !$.contains(el, document.activeElement)) 
        self.focus()
    }, 0)    
  },

  focus: function(){
    this.refs.modal.getDOMNode().focus()
  },

  iosClickHack: function () {
    // IOS only allows click events to be delegated to the document on elements
    // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
    // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
    this.refs.modal.getDOMNode().onclick = function () {};
    this.refs.backdrop.getDOMNode().onclick = function () {};
  },


  componentDidMount: function () {
    $.on(document, 'keyup', this.handleDocumentKeyUp);
    $.on(document, focusEvent, this._focus, true)


    if (this.props.backdrop) 
      this.iosClickHack();

    setTimeout(function(){ self.focus() }, 0)
  },

  componentDidUpdate: function (prevProps) {
    if (this.props.backdrop && this.props.backdrop !== prevProps.backdrop) 
      this.iosClickHack();
  },

  componentWillUnmount: function () {
    $.off(document, 'keyup', this.handleDocumentKeyUp);
    $.off(document, focusEvent, this._focus, true)
  },

  handleBackdropClick: function (e) {
    if (e.target !== e.currentTarget) return;
    this.props.onRequestHide();
  },

  handleDocumentKeyUp: function (e) {
    if (this.props.keyboard && e.keyCode === 27)
      this.props.onRequestHide();
  }
});

module.exports = Modal;
