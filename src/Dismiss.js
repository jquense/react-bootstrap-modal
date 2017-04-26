import React from 'react';
import PropTypes from 'prop-types';

let chain = (a, b) => (...args) => {
  a && a(...args)
  b && b(...args)
}

class Dismiss extends React.Component {

  static propTypes = {
    component:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ])
  }

  static defaultProps = {
    component: 'button',
  }

  static contextTypes = {
    onModalHide: PropTypes.func
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
