/*global JSXTransformer */
'use strict';

var React = require('react')
  , ReactDOM = require('react-dom')
  , CodeMirrorEditor = require('./codemirror')
  , babel = require('babel/browser')
  , Modal = require('../../src/Modal')
  , { whitelist, ...config } = require('../../package.json').babel;


function scopedEval(code, mountNode)  {
  var context = { Modal, mountNode, React, ReactDOM }

  return (new Function( "with(this) { " + code + "}")).call(context);
}

module.exports = React.createClass({

  propTypes: {
    codeText: React.PropTypes.string.isRequired,
    transformer: React.PropTypes.func,
    renderCode: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      transformer: function(code) {
        return babel.transform(code, config).code;
      }
    };
  },

  getInitialState: function() {
    return {
      code: this.props.codeText
    };
  },

  handleCodeChange: function(value) {
    this.setState({code: value, error: null },
      () => this.executeCode());

  },

  compileCode: function() {
    return this.props.transformer(this.state.code);
  },

  render: function() {

    return (
      <div className="editable-example">
        <div className='editable-rendered'>
          <div ref="mount" />
        </div>
        <div className='editable-editor'>
          <CodeMirrorEditor key="jsx"
            onChange={this.handleCodeChange}
            value={this.state.code}/>
          { this.state.error &&
            <div className='text-danger editable-error'>{this.state.error}</div>
          }
        </div>
      </div>
      );
  },

  componentDidMount: function() {
    this.executeCode();
  },

  componentWillUpdate: function(nextProps, nextState) {
    clearTimeout(this.timeoutID);
    // execute code only when the state's not being updated by switching tab
    // this avoids re-displaying the error, which comes after a certain delay
    if (this.state.code !== nextState.code)
      setTimeout(() => this.executeCode());
  },

  setTimeout: function() {
    clearTimeout(this.timeoutID);
    this.timeoutID = setTimeout.apply(null, arguments);
  },

  componentWillUnmount: function() {
    var mountNode = this.refs.mount;

    try {
      ReactDOM.unmountComponentAtNode(mountNode);
    }
    catch (e) { }
  },

  executeCode: function() {
    var mountNode = this.refs.mount;

    try {
      ReactDOM.unmountComponentAtNode(mountNode);
    }
    catch (e) { }

    try {
      scopedEval(this.compileCode(), mountNode);
    }
    catch (err) {
      this.setTimeout(() => {
        this.setState({ error: err.toString() })
      }, 1000);
    }
  }
});
