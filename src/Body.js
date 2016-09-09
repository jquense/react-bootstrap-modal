import React from 'react';
import cn from 'classnames';

class ModalBody extends React.Component {

  static getDefaultPrefix(){
    return 'modal'
  }

  render() {
    let { modalPrefix, children, className, ...props } = this.props;
    let prefix = modalPrefix || ModalBody.getDefaultPrefix();

    return (
      <div {...props} className={cn(className,  prefix + '-body')}>
        {children}
      </div>
    )
  }
}


ModalBody.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalPrefix: React.PropTypes.string
};

export default ModalBody
