'use strict';
import React  from 'react';
import activeElement  from 'react/lib/getActiveElement';
import canUseDOM from 'dom-helpers/util/inDOM';

import Fade from './Fade';
import Body   from './Body';
import Header from './Header';
import Title from './Title';
import Footer from './Footer';
import Dismiss from './Dismiss';

import createOverlay from './createOverlay';

import contains from 'dom-helpers/query/contains';
import classes from 'dom-helpers/class';
import events from 'dom-helpers/events';
import scrollbarWidth from 'dom-helpers/util/scrollbarSize';
import css from 'dom-helpers/style';
import cn from 'classnames';

var stack = [], baseIndex = {};


var getZIndex = (function () {
  var modal = document.createElement("div")
    , backdrop = document.createElement("div")
    , zIndexFactor;


  modal.className = 'modal hide'
  backdrop.className = 'modal-backdrop hide'

  document.body.appendChild(modal)
  document.body.appendChild(backdrop)

  baseIndex.modal = +css(modal, 'z-index')
  baseIndex.backdrop = +css(backdrop, 'z-index')
  zIndexFactor = baseIndex.modal - baseIndex.backdrop

  document.body.removeChild(modal)
  document.body.removeChild(backdrop)

  return function (type) {
    return baseIndex[type] + (zIndexFactor * stack.length);
  }
}())

let onFocus = handler => {
  events.on(document, 'focus', handler, true)

  return () => events.off(document, 'focus', handler, true)
}

let Modal = (function(){

  class Modal extends React.Component {

    static propTypes = {
      show:     React.PropTypes.bool,

      backdrop: React.PropTypes.oneOf(['static', true, false]),
      keyboard: React.PropTypes.bool,
      animate:  React.PropTypes.bool,
      onHide:   React.PropTypes.func,

      modalPrefix: React.PropTypes.string,
      dialogClassName: React.PropTypes.string,
    }

    static defaultProps = {
      backdrop:           true,
      keyboard:           true,
      animate:            true,
      attentionAnimation: 'shake',
      modalPrefix:        'modal'
    }

    static childContextTypes = {
      onModalHide: React.PropTypes.func
    }

    constructor(){
      super()

      this._focus = this._focus.bind(this)
      this.state = {
        classes: ''
      }
    }

    componentWillMount() {
      if ( canUseDOM ) this.lastFocus = activeElement();
    }

    componentDidMount() {
      this._mounted = true
      this._bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight

      if(!stack.length) {
        classes.addClass(document.body, 'modal-open')
        this._styleBody()
      }

      if( stack.indexOf(this) === -1)
        stack.push(this)

      events.on(document, 'keyup', this.handleDocumentKeyUp = e => {
        if (this.props.keyboard && e.keyCode === 27 && this.isTopModal()){
          if (this.props.backdrop === 'static')
            return this.attention()

          this.props.onHide();
        }
      })

      events.on(window, 'resize',
        this.handleUpdate = () => this.setState(this._getStyles()))

      this._removeFocusListener = onFocus(this._focus)

      if (this.props.backdrop && this.props.show)
        this.iosClickHack();

      this.setState(
        this._getStyles(), () => this.checkForFocus())
    }

    componentDidUpdate(prevProps) {
      if (this.props.backdrop && this.props.show && this.props.show !== prevProps.show)
        this.iosClickHack();

      if(this.state.attention){
        React.findDOMNode(this).offsetWidth // trigger reflow to allow animation
        this.setState({
          ...this._getStyles(),
          attention: false,
          classes:   this.props.attentionAnimation + ' animated'
        })
      }

      if (this._needsStyleUpdate) {
        this._needsStyleUpdate = false
        this.setState(this._getStyles())
      }
    }

    componentWillUnmount () {
      var idx = stack.indexOf(this)

      this._mounted = false

      if( this.state.classes)
        this._removeAttentionClasses()

      if (idx !== -1) stack.splice(idx, 1)

      if (!stack.length) {
        classes.removeClass(document.body, 'modal-open')
        css(document.body, { 'padding-right': this._containerPadding })
      }

      this._removeFocusListener()

      events.off(document, 'keyup', this.handleDocumentKeyUp);
      events.off(window, 'resize', this.handleUpdate)
    }

    getChildContext(){
      return { onModalHide: this.props.onHide }
    }

    render() {
      var {
          className
        , children
        , ...props } = this.props
        , {
          dialog
        , backdrop } = this.state;

      let modal = (
          <div {...props}
            ref='modal'
            tabIndex='-1'
            role='dialog'
            style={dialog}
            className={cn(className, this.props.modalPrefix)}
            onClick={this.props.backdrop ? e => this.handleBackdropClick(e) : null}>

            <div
              key='modal'
              ref='dialog'
              className={cn(this.props.modalPrefix + '-dialog', this.props.dialogClassName, this.state.classes)}
            >
              <div className={this.props.modalPrefix + '-content' }>
                { children }
              </div>
            </div>
          </div>
      )

      return  this.props.backdrop
        ? this.renderBackdrop(modal, backdrop)
        : modal
    }

    renderBackdrop(modal, styles) {
      let { animate } = this.props;
      let duration = Modal.BACKDROP_TRANSITION_DURATION; //eslint-disable-line no-use-before-define

      let backdrop = (
        <div ref="backdrop"
          style={styles}
          className={cn(this.props.modalPrefix + '-backdrop', { in: this.props.show && !animate })}
          onClick={e => this.handleBackdropClick(e)}
        />
      );

      return (
        <div>
          { animate
              ? <Fade transitionAppear in={this.props.show} duration={duration}>{backdrop}</Fade>
              : backdrop
          }
          {modal}
        </div>
      );
    }

    checkForFocus() {
      let current = activeElement()
        , focusInModal = current && contains(React.findDOMNode(this.refs.modal), current);

      if (this.props.autoFocus && !focusInModal) {
        this.lastFocus = current;
        this.focus();
      }
    }

    _focus(){
      var el = React.findDOMNode(this)

      if ( this.isTopModal() && el !== activeElement() && !contains(el, document.activeElement))
        this.focus()
    }

    focus(){
      React.findDOMNode(this.refs.modal).focus()
    }

    attention(){
      this.setState({
        attention: true,
        classes:   ''
      })

      this.focus();
    }

    iosClickHack() {
      React.findDOMNode(this.refs.modal).onclick = ()=>{};
      React.findDOMNode(this.refs.backdrop).onclick = ()=>{};
    }

    isTopModal(){
      return !!stack.length && stack[stack.length - 1] === this
    }

    handleBackdropClick(e) {
      if (e.target !== e.currentTarget) return;
      if (this.props.backdrop === 'static')
        return this.attention()

      this.props.onHide();
    }

    _styleBody(){
      var padding = parseInt(css(document.body, 'padding-right') || 0, 10)

      this._containerPadding = document.body.style.paddingRight || ''

      if (this._bodyIsOverflowing)
        css(document.body, { 'padding-right': `${padding + scrollbarWidth}px` })
    }

    _getStyles() {
      if ( !canUseDOM )
        return {}

      var node = React.findDOMNode(this)
        , scrollHt = node.scrollHeight
        , bodyIsOverflowing = this._bodyIsOverflowing
        , modalIsOverflowing = scrollHt > document.documentElement.clientHeight

      return {
        dialog: {
          zIndex: getZIndex('modal'),
          paddingRight: bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth : void 0,
          paddingLeft:  !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth : void 0
        },
        backdrop: {
          zIndex: getZIndex('backdrop')
        }
      }
    }

    _removeAttentionClasses() {
      var dialog  = React.findDOMNode(this.refs.dialog)
        , classes = this.props.attentionAnimation + ' animated';

      dialog.className = dialog.className.replace(classes, '')
      dialog.offsetWidth
    }
  }

  // its easier to just wrap the whole component in another one for the Transition
  // That way we don't need to do checks for is dialog mounted, etc in the above, simplifying the logic
  return class ModalPortal extends React.Component {

    static defaultProps = Modal.defaultProps

    render() {
      let { children, ...props } = this.props;

      let getDialog = el => el.querySelectorAll('.modal-dialog')[0];

      let show = !!props.show;

      let modal = (
        <Modal {...props} ref='modal'>
          { children }
        </Modal>
      );

      return (
        props.animate
          ? (
            <Fade
              in={show}
              transitioningNode={getDialog}
              transitionAppear={show}
              duration={Modal.TRANSITION_DURATION}
              unmountOnExit
            >
              { modal }
            </Fade>
          )
          : show && modal
      );
    }
  }
})();


let ModalTrigger = createOverlay(props => <Modal {...props}>{ props.children }</Modal>)


ModalTrigger.Body = Body
ModalTrigger.Header = Header
ModalTrigger.Title = Title
ModalTrigger.Footer = Footer
ModalTrigger.Dismiss = Dismiss

ModalTrigger.BaseModal = Modal

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

module.exports = ModalTrigger
