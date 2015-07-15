var React = require('react')
var cn = require('classnames');

class ModalFooter extends React.Component {

  static getDefaultPrefix(){
    return 'modal'
  }

  render() {
    var prefix = this.props.modalPrefix || ModalFooter.getDefaultPrefix();

    return (
      <div {...this.props} className={cn(this.props.className, prefix + '-footer')}>
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


module.exports = ModalFooter