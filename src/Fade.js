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
        className='fade'
        enteredClassName='in'
        enteringClassName='in'
      />
    );
  }
}

export default Fade
