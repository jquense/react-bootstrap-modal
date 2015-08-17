import React  from 'react';
import { findDOMNode } from 'react-dom';
import canUseDOM from 'dom-helpers/util/inDOM';

import BaseModal from 'react-overlays/lib/Modal';
import isOverflowing from 'react-overlays/lib/utils/isOverflowing';

import Fade from './Fade';
import Body   from './Body';
import Header from './Header';
import Title from './Title';
import Footer from './Footer';
import Dismiss from './Dismiss';

import ownerDocument from 'dom-helpers/ownerDocument';
import contains from 'dom-helpers/query/contains';
import classes from 'dom-helpers/class';
import events from 'dom-helpers/events';
import scrollbarWidth from 'dom-helpers/util/scrollbarSize';
import css from 'dom-helpers/style';
import cn from 'classnames';

var baseIndex = {};
var PREFIX = 'modal';

var getZIndex;

class ModalContent extends React.Component {

  static childContextTypes = {
    onModalHide: React.PropTypes.func
  }

  getChildContext(){
    return this._context || (this._context = { onModalHide: this.props.onHide })
  }

  render() {
    return (
      <div {...this.props}>
        { this.props.children }
      </div>
    );
  }
}


class Modal extends React.Component {

  static getDefaultPrefix(){
    return PREFIX
  }

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
  }

  static childContextTypes = {
    onModalHide: React.PropTypes.func
  }

  getChildContext(){
    return this._context || (this._context = { onModalHide: this.props.onHide })
  }

  constructor(){
    super()
    this._show = this._show.bind(this)
    this._removeAttentionClasses = this._removeAttentionClasses.bind(this)

    this.state = {
      classes: ''
    }
  }

  componentDidMount() {
    getZIndex = getZIndex || (function () {
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
        return baseIndex[type] + (zIndexFactor * (BaseModal.manager.modals.length - 1));
      }
    }())
  }

  _show(prevProps) {
    if (this.props.show)
      this.setState(this._getStyles())
  }

  render() {
    var {
        className
      , children
      , keyboard
      , ...props } = this.props
      , {
        dialog
      , backdrop } = this.state;

    let prefix = this.props.modalPrefix || Modal.getDefaultPrefix();

    let modal = (
      <div {...props}
        ref='modal'
        style={dialog}
        className={cn(className, prefix)}
        onClick={this.props.backdrop ? e => this.handleBackdropClick(e) : null}
      >
        <div
          key='modal'
          ref='dialog'
          className={cn(
              prefix + '-dialog'
            , this.props.dialogClassName
            , this.state.classes, {
              [prefix + '-sm']: props.small || props.sm,
              [prefix + '-lg']: props.large || props.lg,
            }
          )}
        >
          <div className={prefix + '-content' }>
            { children }
          </div>
        </div>
      </div>
    )

    return (
      <BaseModal
        keyboard={keyboard}
        backdrop={props.backdrop}
        show={this.props.show}
        onHide={this.props.onHide}
        onEntering={this._show}
        onExiting={this._removeAttentionClasses}
        backdropStyle={backdrop}
        backdropClassName={prefix + '-backdrop'}
        containerClassName={prefix + '-open'}
        transition={Fade}
        dialogTransitionTimeout={Modal.TRANSITION_DURATION}
        backdropTransitionTimeout={Modal.BACKDROP_TRANSITION_DURATION}
      >
        { modal }
      </BaseModal>
    )
  }

  attention(){
    let { animate } = this.state
      , classes = this.props.attentionAnimation + ' animated';

    if (!animate)
      this.setState({ classes: '', animate: true }, ()=> {

        if (this.props.show) {
           // trigger reflow to allow animation
          this.refs.dialog.offsetWidth
          this.setState({ animate: false, classes })
        }
      })
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

    var node = findDOMNode(this.refs.modal)
      , doc = ownerDocument(node)
      , scrollHt = node.scrollHeight
      , bodyIsOverflowing = isOverflowing(this.props.container || doc.body)
      , modalIsOverflowing = scrollHt > doc.documentElement.clientHeight

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
    this.setState({ classes: '' })
  }
}



Modal.injectCSSPrefix = function(prefix) {
  PREFIX = prefix;
};

function getDefaultPrefix(){
  return PREFIX
}

Body.getDefaultPrefix = getDefaultPrefix
Header.getDefaultPrefix = getDefaultPrefix
Title.getDefaultPrefix = getDefaultPrefix
Footer.getDefaultPrefix = getDefaultPrefix

Modal.Body = Body
Modal.Header = Header
Modal.Title = Title
Modal.Footer = Footer
Modal.Dismiss = Dismiss

Modal.BaseModal = Modal

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

export default Modal;
