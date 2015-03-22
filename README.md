React Bootstrap Modal
===================================

Partly a port of [jschr's bootsrap modal](https://github.com/jschr/bootstrap-modal/) Reimplements the Twitter Bootstrap Modal component in a React friendly way. Based on the orginal work of the react-bootstrap team.

## Features

- Scoped focus (in twb proper but not react-bootstrap)
- Stackable!
- Animation when trying to close a "static" Modal
- Can be driven programatically, or by another Trigger Component

## Use

The Modal more or less follows the react-bootstrap api, with a few exceptions.

```js
var Modal = require('react-bootstrap-modal')

class ModalExample extends React.Component {

  render(){
    let closeModal = () => this.setState({ open: false })

    let saveAndClose = () => {
      api.saveData()
        .then(() => this.setState({ open: false }))
    }

    return (
      <div>
        <button type='button'>Launch modal</button>

        <Modal 
          show={this.state.open} 
          onHide={closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <h4 id='ModalHeader'>A Title Goes here</h4>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>
            // If you don't have anything fancy to do you can use 
            // the convenient `Dismiss` component, it will trigger `onHide` when clicked
            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

            // Or you can create your own dismiss buttons
            <button className='btn btn-primary' onClick={saveAndClose}>Save</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

React.render(<ModalExample />, document.body);

```

### Modal

#### Props
- `show`: `Boolean(default false)` make the Modal visible or hidden
- `backdrop`: `Enum<'static', true, false>(default true)` - Should the modal render a backdrop overlay. `"static"` backdrops are not dismissable by clicking the backdrop.

- `animate`: `Boolean(default true)` - animate the entry and exit of the modal
- `attentionAnimation`: `String(default 'shake')` - an animation class added to the modal when a "static" backdrop is clicked
- `keyboard`: `Boolean(default true)` - Modal is dismissable via the `esc` key

### Modal.Header

The Header section of Modal. If not included be sure to add an `aria-labelledby` elsewhere to keep the Modal accessible.

#### Props
  - `closeButton`: `Boolean(default true)` - render a close button or not
  - `onClose`: `Function()` - a Handle when the close button is clicked. if left `undefined` the Header will automatically wire itself into the parent Modal `onHide()`, so you only need to specify a handler if you want a different behavior

### Modal.Body

The main content of the Modal, a convenience Component for: `<div className='modal-body'>content</div>`

### Modal.Footer

The bottom footer of the Modal, a convenience Component for: `<div className='modal-footer'>content</div>`

### Modal.Dismiss

A dismiss button for the Parent Modal. `Dismiss` button will trigger its parent Modal `onHide()` handler. You don't need to use a Dismiss button, they are jsut a Convenience Component.
  
## Styles

You can use this module seperate from Twitter Bootstrap by just including the `/lib/styles/rbm-complete.css` file, or if you are using bootstrap and don't want to re-include styles you can just use `/lib/styles/rbm-patch.css`.

If you don't like the bootstrap visual look and feel, you can adjust `variables.less` to suit your needs.