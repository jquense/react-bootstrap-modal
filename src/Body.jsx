
var React = require('react');
var cn = require('classnames');

class ModalBody extends React.Component {

  render() {
    return (
      <div {...this.props} className={cn(this.props.className,  this.props.modalPrefix + '-body')}>
        {this.props.children}
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

ModalBody.defaultProps = {
  modalPrefix: 'modal'
};

module.exports = ModalBody