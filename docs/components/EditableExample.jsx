/*global JSXTransformer */
'use strict';

var React = require('react')
  , ReactDOM = require('react-dom')
  , Modal = require('../../src/Modal')
  , Playground = require('@jquense/component-playground');

var scope = { Modal, React, ReactDOM }

module.exports = React.createClass({
  render() {
    return (
      <Playground
        {...this.props}
        mode='text/jsx'
        theme='oceanicnext'
        babelConfig={{ stage: 0 }}
        scope={scope}
      />
    );
  }
});
