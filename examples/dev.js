'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import EditableExample from './components/EditableExample'

require('bootstrap/dist/css/bootstrap.min.css')
require('./vendor/styles.css')
require('./site.css')
require('../src/less/rbm-patch.less')

let div = document.createElement('div')
document.body.appendChild(div)

class Docs extends React.Component {
  render() {
    return (
      <div className='container'>
        {ReactDOM.createPortal(<p>foo</p>, div)}
        <section className='section'>
          <div className='section-inner'>
            <h3>Accessible</h3>
            <EditableExample code={require('./raw/accessible')} />

            <h3>Static Backdrop Animation</h3>
            <EditableExample code={require('./raw/static')} />

            <h3>Stackable Modals</h3>
            <EditableExample code={require('./raw/stackable')} />
          </div>
        </section>
      </div>
    )
  }
}


ReactDOM.render(<Docs/>, document.getElementById('app'));
