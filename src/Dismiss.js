import React from 'react';

let chain = (a, b) => (...args) => {
  a && a(...args)
  b && b(...args)
}

class Dismiss extends React.Component {

  static propTypes = {
    component:  React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func
    ])
  }

  static defaultProps = {
    component: 'button',
  }

  static contextTypes = {
    onModalHide: React.PropTypes.func
  }

  render() {
    let {
        component: Tag
      , children
      , ...props } = this.props

    return (
      <Tag
        {...props}
        onClick={chain(props.onClick, this.context.onModalHide)}
      >
        { children }
      </Tag>
    );
  }
}

export default Dismiss
