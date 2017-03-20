import React  from 'react';
import { findDOMNode } from 'react-dom';

import BaseModal from 'react-overlays/lib/Modal';
import isOverflowing from 'react-overlays/lib/utils/isOverflowing';
import componentOrElement from 'react-prop-types/lib/componentOrElement';

import Fade from './Fade';
import Body   from './Body';
import Header from './Header';
import Title from './Title';
import Footer from './Footer';
import Dismiss from './Dismiss';

import ownerDocument from 'dom-helpers/ownerDocument';
import canUseDOM from 'dom-helpers/util/inDOM';
import scrollbarWidth from 'dom-helpers/util/scrollbarSize';
import css from 'dom-helpers/style';
import cn from 'classnames';

let baseIndex = {};
let PREFIX = 'modal';

let getZIndex;

let omit = (obj, keys) => Object.keys(obj).reduce((o, key) => {
  if (keys.indexOf(key) === -1) o[key] = obj[key]
  return o;
}, {});


class Modal extends React.Component {

  static getDefaultPrefix() {
    return PREFIX
  }

  static propTypes = {
    show: React.PropTypes.bool,

    /** sizes **/
    small: React.PropTypes.bool,
    sm: React.PropTypes.bool,
    large: React.PropTypes.bool,
    lg: React.PropTypes.bool,
    /** --- **/

    backdrop: React.PropTypes.oneOf(['static', true, false]),
    keyboard: React.PropTypes.bool,
    animate: React.PropTypes.bool,
    transition: React.PropTypes.any,
    container: React.PropTypes.oneOfType([componentOrElement, React.PropTypes.func]),

    onHide: React.PropTypes.func,
    onEnter: React.PropTypes.func,
    onEntering: React.PropTypes.func,
    onEntered: React.PropTypes.func,
    onExit: React.PropTypes.func,
    onExiting: React.PropTypes.func,
    onExited: React.PropTypes.func,

    modalPrefix: React.PropTypes.string,
    dialogClassName: React.PropTypes.string,
    attentionClass: React.PropTypes.string,
  }

  static defaultProps = {
    backdrop:           true,
    keyboard:           true,
    animate:            true,
    transition:         true,
    container:          canUseDOM ? document.body : null,
    attentionClass:     'shake',
    manager: (BaseModal.getDefaultProps
      ? BaseModal.getDefaultProps()
      : BaseModal.defaultProps
    ).manager
  }

  static childContextTypes = {
    onModalHide: React.PropTypes.func
  }

  getChildContext(){
    return this._context || (this._context = { onModalHide: this.props.onHide })
  }

  constructor(){
    super()

    this.handleEntering = this.handleEntering.bind(this)
    this.handleExiting  = this.handleExiting.bind(this)

    this.state = {
      classes: ''
    }
  }

  componentDidMount() {
    getZIndex = getZIndex || (() => {
      let modal = document.createElement('div')
        , backdrop = document.createElement('div')
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

      return (type) => baseIndex[type] + (zIndexFactor * (this.props.manager.modals.length - 1));
    })();
  }

  handleEntering(...args) {
    this._show(...args);

    if (this.props.onEntering) {
      this.props.onEntering()
    }
  }

  handleExiting() {
    this._removeAttentionClasses()
    if (this.props.onExiting) {
      this.props.onExiting();
    }
  }

  render() {
    let {
        className
      , children
      , keyboard
      , transition
      , modalPrefix
      , dialogClassName
      , container
      , onEnter, onEntered
      , onExit, onExited
      , ...props } = this.props

    let { dialog, classes, backdrop } = this.state;

    delete props.manager;
    let elementProps = omit(props, Object.keys(Modal.propTypes))

    let prefix = modalPrefix || Modal.getDefaultPrefix();

    if (transition === true)
      transition = Fade;

    let modal = (
      <div
        {...elementProps}
        ref={r => this.dialog = r }
        style={dialog}
        className={cn(className, prefix, { in: props.show && !transition })}
        onClick={this.props.backdrop ? e => this.handleBackdropClick(e) : null}
      >
        <div
          key='modal'
          ref='inner'
          className={cn(
              prefix + '-dialog'
            , dialogClassName
            , classes
            , (props.small || props.sm) && `${prefix}-sm`
            , (props.large || props.lg) && `${prefix}-lg`
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
        ref={ref => {
          this.modal = ref && ref.modal
          this.backdrop = ref && ref.backdrop
        }}
        container={container}
        backdrop={props.backdrop}
        show={props.show}
        onHide={this.props.onHide}
        onEnter={onEnter}
        onEntering={this.handleEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={this.handleExiting}
        onExited={onExited}
        backdropStyle={backdrop}
        backdropClassName={prefix + '-backdrop'}
        containerClassName={prefix + '-open'}
        transition={transition}
        dialogTransitionTimeout={Modal.TRANSITION_DURATION}
        backdropTransitionTimeout={Modal.BACKDROP_TRANSITION_DURATION}
      >
        {modal}
      </BaseModal>
    )
  }

  attention() {
    let { attentionClass } = this.props;

    if (attentionClass)
      this.setState({ classes: '' }, ()=> {
        if (this.props.show) {
           // eslint-disable-next-line no-unused-expressions
          this.refs.inner.offsetWidth
          this.setState({
            classes: attentionClass + ' animated',
          })
        }
      })
  }


  handleBackdropClick(e) {
    if (e.target !== e.currentTarget) return;
    if (this.props.backdrop === 'static')
      return this.attention()

    this.props.onHide();
  }

  _show() {
    if (this.props.show)
      this.setState(this._getStyles())
  }

  _getStyles() {
    if (!canUseDOM)
      return {}

    let node = findDOMNode(this.dialog)
      , doc = ownerDocument(node)
      , scrollHt = node.scrollHeight
      , bodyIsOverflowing = isOverflowing(this.props.container || doc.body)
      , modalIsOverflowing = scrollHt > doc.documentElement.clientHeight

    return {
      dialog: {
        zIndex: getZIndex('modal'),
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? scrollbarWidth() : void 0,
        paddingLeft:  !bodyIsOverflowing && modalIsOverflowing ? scrollbarWidth() : void 0,
        display: 'block'
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
