React Bootstrap Modal
===================================

Partly a port of [jschr's bootstrap modal](https://github.com/jschr/bootstrap-modal/). Reimplements the Twitter Bootstrap Modal component in a React friendly way. Based on the original work of the react-bootstrap team.

__note__: React bootstrap modal is compatible with bootstrap __3.3.4+__ if you want to use it with an earlier version of bootstrap 3 you need to override the `.modal-backdrop` styles to be the most recent one.

## Features

- Scoped focus
- Stackable! (use with constraint)
- Animated feedback when trying to close a "static" Modal
- Straightforward API, no ModalTrigger or Overlay mixins to deal with

## Use

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
            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>
            // If you don't have anything fancy to do you can use
            // the convenient `Dismiss` component, it will
            // trigger `onHide` when clicked
            <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>

            // Or you can create your own dismiss buttons
            <button className='btn btn-primary' onClick={saveAndClose}>
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

ReactDOM.render(<ModalExample />, document.body);
```

### Styles

If you are already including Twitter Bootstrap styles (e.g. `bootstrap.min.css`), then include `/lib/css/rbm-patch.css`.
If you want to use this module without Twitter Bootstrap, then include `/lib/css/rbm-complete.css`.

If you do not like the Bootstrap visual look and feel, you can adjust `variables.less` to suit your needs and transpile it to css yourself.

## Components

### `Modal`

The main Modal Component.

#### Props

- `show`: `Boolean(default false)` make the Modal visible or hidden
- `backdrop`: `Enum<'static', true, false>(default true)` - Should the modal render a backdrop overlay. `"static"` backdrops are not dismissible by clicking the backdrop.
- `keyboard`: `Boolean(default true)` Modal is dismissible via the `esc` key

- `transition` `Boolean(default true)` Fade the entry and exit of the modal. You can also provide a
Transition component from the `react-transition-group` v2 library to customize the animation more minutely.
- `attentionClass`: `String(default 'shake')` - an animation class added to the modal when a "static" backdrop is clicked, set to nothing if
no animation is desired
- `container`: `Node(default document.body)`, a DOM Node to append the modal too
- `onEnter`: handler fires right before the Modal animates in
- `onEntering`: handler fires as the Modal starts entering
- `onEntered`: handler fires after the enter animation finishes
- `onExit`: handler fires right before the Modal animates out
- `onExiting`: handler fires as the Modal starts exiting
- `onExited`: handler fires after the exit animation finishes

### `Modal.Header`

The Header section of Modal. If not included be sure to add an `aria-labelledby` elsewhere to keep the Modal accessible.

#### Props
  - `closeButton`: `Boolean(default true)` - render a close button or not
  - `onClose`: `Function()` - a Handle when the close button is clicked. if left `undefined` the Header will automatically wire itself into the parent Modal `onHide()`, so you only need to specify a handler if you want a different behavior

### `Modal.Title`

### `Modal.Body`

The main content of the Modal, a convenience Component for: `<div className='modal-body'>content</div>`

### `Modal.Footer`

The bottom footer of the Modal, a convenience Component for: `<div className='modal-footer'>content</div>`

### `Modal.Dismiss`

A dismiss button for the Parent Modal. `Dismiss` button will trigger its parent Modal `onHide()` handler. You don't need to use a Dismiss button, they are just a Convenience Component.

### `Modal.BaseModal`

BaseModal represents just the modal markup without any of the logic to render it to the `document.body`. It is generally not recommended that you work with this component directly. You can use it if you really want to render a Modal inline.

