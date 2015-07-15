var React = require('react')
var cn = require('classnames');

class ModalFooter extends React.Component {

  render() {
    return (
      <div {...this.props} className={cn(this.props.className, this.props.modalPrefix + '-footer')}>
        {this.props.children}
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

ModalFooter.defaultProps = {
  modalPrefix: 'modal'
};


module.exports = ModalFooter