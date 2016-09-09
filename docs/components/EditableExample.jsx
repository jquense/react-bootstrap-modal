var React = require('react')
  , ReactDOM = require('react-dom')
  , Modal = require('../../src/Modal')
  , Playground = require('@monastic.panic/component-playground/Playground');

var scope = { Modal, React, ReactDOM }

module.exports = React.createClass({
  render() {
    return (
      <Playground
        {...this.props}
        mode='jsx'
        theme='oceanicnext'
        scope={scope}
        babelConfig={{
          presets: ['es2015', 'react', 'stage-0']
        }}
      />
    );
  }
});
