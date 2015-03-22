var React = require('react')
var cn = require('classnames');

class ModalTitle extends React.Component {

  render() {
    return (
      <h4 {...this.props} className={cn(this.props.className, 'modal-title')}>

        { this.props.children }

      </h4>
    );
  }
}

module.exports = ModalTitle