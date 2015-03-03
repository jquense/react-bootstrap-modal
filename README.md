React Bootstrap Modal
===================================

Partly a port of [jschr's bootsrap modal](https://github.com/jschr/bootstrap-modal/) Reimplements the Twitter Bootstrap Modal component in a React friendly way. Based on the orginal work of the react-bootstrap team.

### Features

- Scoped focus (in twb proper but not react-bootstrap)
- Stackable!
- Animation when trying to close a "static" Modal
- Can be driven programatically, or by another Trigger Component


### Use

The Modal more or less follows the react-bootstrap api, with a few exceptions.

```javascript
var rbm = require('react-boostrap-modal')

var Modal = React.createClass({

      render(){
        return (
          <rbm.Modal bsSize='lg' animation backdrop='static' title='My Modal'>
              <div className="modal-body">
                  <p>Some Content here</p>
              </div>
              <div className="modal-footer">
                  <button onClick={this.props.onRequestHide}>Close</button>
              </div>
          </rbm.Modal>)
      }
  });

React.render((
    <rbm.ModalTrigger modal={<Modal />}>
      <button type='button'>Launch modal</button>
    </rbm.ModalTrigger>
  ), document.body);

```

### Modal.Props

- onRequestHide `Function` - this handler is passed in by the parent trigger, and should be called when the Modal should close.
- title `Node` - Title of the Modal
- - bsSize `lg sm xs`
- backdrop `Enum<'static', true, false>(default true)` - Should the modal render a backdrop overlay. `"static"` backdrops are not dismissable by clicking the backdrop.
- closeButton `Boolean(default true)` - render a close button or not
- animation `Boolean(default true)` - animate the entry and exit of the modal
- attentionAnimation `String(default 'shake')` - an animation class added to the modal when a "static" backdrop is clicked
- keyboard `Boolean(default true)` - Modal is dismissable via the `esc` key

### Styles

You can use this module seperate from Twitter Bootstrap by just including the `/lib/bbm-complete.css` file, or if you are using bootstrap and don't want to have duplicate css on the page just include `/lib/bbm-patch.css`.


### Triggers and Layers

Included is the component `ModalTrigger`, you can also create your own triggers by using the `OverlayMixin` and defining a `renderOverlay(...)` method on your component that returns a Modal Element.

Alternatively if you want to trigger Overlays programatically, instead of via a Component, you can use the `Layer` Object.

```javascript
var Layer = require('react-boostrap-modal').Layer
var Modal = require('react-boostrap-modal').Modal

module.exports = function alert(message, callback) {
    var layer = new Layer(document.body, renderModal)

    layer.render()

    function renderModal(){
        return (
            <Modal show onRequestHide={finish} backdrop='static'>
              <div className="modal-body">
                  <h4>{message}</h4>
              </div>
              <div className="modal-footer">
                  <button onClick={finish}>Close</button>
              </div>
            </Modal>
        )
    }

    function finish(){
        callback()
        layer.destroy() 
    }
}
```

### `new Layer(container, renderFn)`

The Layer object takes two constructor arguments `container` which is a DOM node taht the layer will be mounted too such as the `body`, and `render` which is a function that, when called, returns the overlay Elements (React element), such as a Modal

### `Layer.render()`

Mounts and Renders the return value of the function provided in the constructor (`renderFn`) to the container

### `Layer.unmount()`

Un mounts the component from the container

### `Layer.destroy()`

Unmounts, and removes all traces of the layer from the container. This calls `unmount()` so there is no need to call it in addition to `destroy`.
