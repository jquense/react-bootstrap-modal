import React from 'react';
import Transition from 'react-overlays/lib/Transition';

class Fade extends React.Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    return (
      <Transition
        {...this.props}
        in={this.props.in}
        className='fade'
        enteredClassName='in'
        enteringClassName='in'
      >
        { this.props.children }
      </Transition>
    );
  }
}

export default Fade