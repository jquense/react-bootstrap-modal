import React from 'react';
import cn from 'classnames';

class ModalTitle extends React.Component {

  static getDefaultPrefix(){
    return 'modal'
  }

  render() {
    var prefix = this.props.modalPrefix || ModalTitle.getDefaultPrefix();

    return (
      <h4 {...this.props} className={cn(this.props.className,  prefix + '-title')}>

        { this.props.children }

      </h4>
    );
  }
}

ModalTitle.propTypes = {
  /**
   * A css class applied to the Component
   */
  modalPrefix: React.PropTypes.string
};


module.exports = ModalTitle
