
module.exports = function(){
  var code = `
class Static extends React.Component {

  constructor(){
    this.state = {
      open: false
    }
  }

  render() {
    var close = () => this.setState({ open: false })

    return (
      <div>
        <Modal 
          aria-labelledby='ModalTitle' 
          show={this.state.open} 
          onHide={close}
        >
          <Modal.Header>
            <Modal.Title id='ModalTitle'>Labels the Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Lorum Bacon</p>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Dismiss className='btn btn-default'>Close</Modal.Dismiss>
          </Modal.Footer>
        </Modal>

        <button 
          className='btn btn-primary' 
          onClick={() => this.setState({ open: true }) }
        >
          Open Modal
        </button>
      </div>
    )
  }
}

React.render(<Static/>, mountNode)
`

return code
}