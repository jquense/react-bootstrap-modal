var React = require('react')
var cn = require('classnames');

class ModalFooter extends React.Component {

  render() {
    return (
      <div {...this.props} className={cn(this.props.className, 'modal-footer')}>

        {this.props.children}

      </div>
    );
  }
}

module.exports = ModalFooter