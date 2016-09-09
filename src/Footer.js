import React from 'react';
import cn from 'classnames';

class ModalFooter extends React.Component {

  static getDefaultPrefix() {
    return 'modal'
  }

  render() {
    let { modalPrefix, children, className, ...props } = this.props;
    let prefix = modalPrefix || ModalFooter.getDefaultPrefix();

    return (
      <div {...props} className={cn(className, prefix + '-footer')}>
        {children}
      </div>
    );
  }
}

ModalFooter.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalPrefix: React.PropTypes.string
};


export default ModalFooter
