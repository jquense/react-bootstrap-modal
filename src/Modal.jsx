'use strict';
var React  = require('react')
  , activeElement  = require('react/lib/getActiveElement')
  , canUseDOM = require('dom-helpers/util/inDOM')

  , Transition = require('./Transition')
  , Body   = require('./Body')
  , Header = require('./Header')
  , Title = require('./Title')
  , Footer = require('./Footer')
  , Dismiss = require('./Dismiss')

  , createOverlay = require('./createOverlay')

  , contains = require('dom-helpers/query/contains')
  , classes = require('dom-helpers/class')
  , events = require('dom-helpers/events')
  , scrollbarWidth = require('dom-helpers/util/scrollbarSize')

  , cn = require('classnames');

var stack = [];


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
      onHide:   React.PropTypes.func
    }

    static defaultProps = {
      backdrop:           true,
      keyboard:           true,
      animate:            true,
      attentionAnimation: 'shake'
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

    componentWillReceiveProps(nextProps) {
      this._needsStyleUpdate = nextProps.backdrop !== this.props.backdrop
    }

    componentDidMount() {

      classes.addClass(document.body, 'modal-open')

      if( stack.indexOf(this) === -1) 
        stack.push(this)

      this._mounted = true
      this._bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight

      events.on(document, 'keyup', this.handleDocumentKeyUp = e => {
        if (this.props.keyboard && e.keyCode === 27 && this.isTopModal()){
          if (this.props.backdrop === 'static')
            return this.attention()

          this.props.onHide();
        }
      })

      events.on(window, 'resize', this.handleUpdate = () => this.setState(this._getStyles()))
      
      this._removeFocusListener = onFocus(this._focus.bind(this))

      if (this.props.backdrop && this.props.show)
        this.iosClickHack();

      this.setState(
        this._getStyles(), () => this.focus())
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

      if(idx !== -1) stack.splice(idx, 1)
        
      if(!stack.length)
        classes.removeClass(document.body, 'modal-open')

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

      return (
        <div {...props}
          ref='modal'
          tabIndex='-1'
          role='dialog'
          style={dialog}
          className={cn(className, { modal: true })}
          onClick={this.props.backdrop ? e => this.handleBackdropClick(e) : null}>

          {this.props.backdrop && this.renderBackdrop(backdrop)}
          
            <div 
              key='modal'
              ref='dialog'
              className={cn('modal-dialog', this.state.classes)}
            >
              <div className='modal-content'>
                { children }
              </div>
            </div>
        </div>
      )
    }

    renderBackdrop(style) {
      return (
        <Transition 
          className={cn({ fade: this.props.animate })} 
          in={this.props.show}>
          <div
            className={cn('modal-backdrop')} 
            ref="backdrop" 
            key='backdrop' 
            style={style} 
            onClick={e => this.handleBackdropClick(e)}/>
        </Transition>
      )
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


    _getStyles() {
      if ( !canUseDOM )
        return {}

      var node = React.findDOMNode(this)
        , scrollHt = node.scrollHeight
        , bodyIsOverflowing = this._bodyIsOverflowing
        , modalIsOverflowing = scrollHt > document.documentElement.clientHeight

      return {
        dialog: {
          paddingRight: bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth : void 0,
          paddingLeft:  !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth : void 0
        },
        backdrop: {
          height: scrollHt
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
  return class extends React.Component {

    render() {
      
     let { 
        onTransitionIn, onTransitionedIn, onTransitionOut, onTransitionedOut
      , ...props } = this.props;

      let transitionProps = { onTransitionIn, onTransitionedIn, onTransitionOut, onTransitionedOut };

      let getDialog = el => el.querySelectorAll('.modal-dialog')[0];
      
      return (

        <Transition 
          {...transitionProps}
          in={props.show}
          transitioningNode={getDialog}
          className={cn({ fade: !props.animate })} 
        >
          <Modal {...this.props}>
            {this.props.children}
          </Modal>
        </Transition>
      )
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

module.exports = ModalTrigger