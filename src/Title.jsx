var React = require('react')
var cn = require('classnames');

class ModalTitle extends React.Component {

  render() {
    return (
      <h4 {...this.props} className={cn(this.props.className,  this.props.modalPrefix + '-title')}>

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

ModalTitle.defaultProps = {
  modalPrefix: 'modal'
};

module.exports = ModalTitle