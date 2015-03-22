
module.exports = function(){
  var code = `
class NestedModal extends React.Component {
  constructor(){
    this.state = {
      open: false
    }
  }

  render(){
    var close = () => this.setState({ open: false })

    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Body>
          <h4>This Modal can open another modal</h4>

          <button onClick={() => this.setState({ open: true }) }>
            Modal Inception
          </button>

          <NestedModal show={this.state.open} onHide={close} />

        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss className='btn btn-default'>Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    )
  }
}
  
class Stackable extends React.Component {

  constructor(){
    this.state = {
      open: false
    }
  }

  render() {
    var close = () => this.setState({ open: false })

    return (
      <div>
        <NestedModal show={this.state.open} onHide={close}/>

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

React.render(<Stackable/>, mountNode)
`

return code
}