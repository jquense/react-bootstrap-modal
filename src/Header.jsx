var React = require('react')
  , cn = require('classnames')
  , Dismiss = require('./Dismiss');

class ModalHeader extends React.Component {

  static _isModalHeader = true

  static defaultProps = {
    closeButton: false,
  }

  static contextTypes = {
    onModalHide: React.PropTypes.func
  }


  render() {
    return (
      <div 
        {...this.props} 
        className={cn(this.props.className, 'modal-header')}
      >
        { this.props.closeButton && 
          <Dismiss 
            className='close'
            aria-label={this.props['aria-label'] || 'Close Modal'} 
            style={{ marginTop: -2 }} 
          >
            <span aria-hidden="true">
              &times;
            </span>
          </Dismiss>
        }
        { this.props.children }
      </div>
    )
  }
}

module.exports = ModalHeader