var React = require('react/addons')
  , Modal = require('../../src/Modal');


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
          <h4>Text in a modal</h4>

          <button onClick={() => this.setState({ open: true }) }>
            Modal Inception
          </button>

          <NestedModal show={this.state.open} onHide={close} />

        </Modal.Body>
        <Modal.Footer>
          <Modal.Dismiss>Close</Modal.Dismiss>
        </Modal.Footer>
      </Modal>
    )
  }
}
  
module.exports = class Stackable extends React.Component {

  constructor(){
    this.state = {
      open: false
    }
  }

  render() {
    var close = () => this.setState({ open: false })

    return (
      <div>
        <button onClick={() => this.setState({ open: true }) }>Open Modal</button>

        <NestedModal show={this.state.open} onHide={close}/>
      </div>
    )
  }
}