
var React = require('react');
var cn = require('classnames');

class ModalBody extends React.Component {

  render() {
    return (
      <div {...this.props} className={cn(this.props.className, 'modal-body')}>
        {this.props.children}
      </div>
    )
  }
}

module.exports = ModalBody