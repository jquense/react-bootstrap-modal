
var React = require('react');
var cn = require('classnames');

class ModalBody extends React.Component {

  static getDefaultPrefix(){
    return 'modal'
  }

  render() {
    var prefix = this.props.modalPrefix || ModalBody.getDefaultPrefix();

    return (
      <div {...this.props} className={cn(this.props.className,  prefix + '-body')}>
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

module.exports = ModalBody
