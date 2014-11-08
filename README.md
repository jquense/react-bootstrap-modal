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

var Modal = (
    <rbm.Modal bsSize='lg' animation backdrop='static' title='My Modal'>
        <div className="modal-body">
            <p>Some Content here</p>
        </div>
        <div className="modal-footer">
            <button onClick={this.props.onRequestHide}>Close</button>
        </div>
    </rbm.Modal>
)

React.render((
    <rbm.ModalTrigger modal={Modal}>
      <button type='button'>Launch modal</button>
    </rbm.ModalTrigger>
  ), document.body);

```

### Props

- onRequestHide `Function` - this handler is passed in by the parent trigger, and should be called when the Modal should close.
- title `Node` - Title of the Modal
- backdrop `Enum<'static', true, false>(default true)` - Should the modal render a backdrop overlay. `"static"` backdrops are not dismissable by clicking the backdrop.
- closeButton `Boolean(default true)` - render a close button or not
- animation `Boolean(default true)` - animate the entry and exit of the modal
- attentionAnimation `String(default 'shake')` - an animation class added to the modal when a "static" backdrop is clicked
- keyboard `Boolean(default true)` - Modal is dismissable via the `esc` key