import React from 'react';
import cn from 'classnames';

class ModalTitle extends React.Component {
  static propTypes = {
    /**
     * A css class applied to the Component
     */
    modalPrefix: React.PropTypes.string
  }

  static getDefaultPrefix() {
    return 'modal'
  }

  render() {
    let { modalPrefix, className, ...props } = this.props;
    let prefix = modalPrefix || ModalTitle.getDefaultPrefix();

    return (
      <h4
        {...props}
        className={cn(className,  prefix + '-title')}
      />
    );
  }
}



export default ModalTitle
