import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Dismiss from './Dismiss';

class ModalHeader extends React.Component {

  static _isModalHeader = true

  static getDefaultPrefix(){
    return 'modal'
  }
  static propTypes = {
    closeButton: PropTypes.bool,
    /**
     * A css class applied to the Component
     */
    modalPrefix: PropTypes.string,

    'aria-label': PropTypes.string,
  }

  static defaultProps = {
    closeButton: false,
    'aria-label': 'Close Modal',
  }

  static contextTypes = {
    onModalHide: PropTypes.func
  }

  render() {
    let {
      modalPrefix,
      closeButton,
      children,
      className,
      'aria-label': label,
      ...props } = this.props;

    let prefix = modalPrefix || ModalHeader.getDefaultPrefix();

    return (
      <div
        {...props}
        className={cn(className,  prefix + '-header')}
      >
        {closeButton &&
          <Dismiss
            className='close'
            aria-label={label}
          >
            <span aria-hidden="true">
              &times;
            </span>
          </Dismiss>
        }
        {children}
      </div>
    )
  }
}

export default ModalHeader
