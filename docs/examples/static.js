class Static extends React.Component {

  constructor(){
    super()
    this.state = {
      open: false
    }
  }

  render() {
    var close = () => this.setState({ open: false })

    return (
      <div>
        <Modal show={this.state.open} onHide={close} backdrop='static'>
          <Modal.Header>
            <Modal.Title>Static backdrop</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Click on the backdrop to try and dismiss it</p>
          </Modal.Body>

          <Modal.Footer>
            <Modal.Dismiss
              className='btn btn-default'
            >
              Close
            </Modal.Dismiss>
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

ReactDOM.render(<Static/>, mountNode)
