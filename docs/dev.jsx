'use strict';




var React = require('react')
  , ReactDOM = require('react-dom')
  , EditableExample = require('./components/EditableExample');

require('../src/less/rbm-patch.less')

class Docs extends React.Component {

  render() {
    return (
      <div className='container'>

        <section className='section'>
          <div className='section-inner'>
            <h3>Accessible</h3>
            <EditableExample codeText={require('./examples/accessible')()} />

            <h3>Static Backdrop Animation</h3>
            <EditableExample codeText={require('./examples/static')()} />

            <h3>Stackable Modals</h3>
            <EditableExample codeText={require('./examples/stackable')()} />
          </div>
        </section>
      </div>
    )
  }
}

var rootInstance = ReactDOM.render(<Docs/>, document.getElementById('app-mount'));
