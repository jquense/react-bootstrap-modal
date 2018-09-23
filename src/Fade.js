import React from 'react';
import Transition, {
  ENTERED,
  ENTERING
} from 'react-transition-group/Transition';
import cn from 'classnames';

const fadeStyles = {
  [ENTERING]: 'in',
  [ENTERED]: 'in'
};

class Fade extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { className, children, ...props } = this.props;
    return (
      <Transition {...props}>
        {(status, innerProps) =>
          React.cloneElement(children, {
            ...innerProps,
            className: cn(
              'fade',
              className,
              children.props.className,
              fadeStyles[status]
            )
          })
        }
      </Transition>
    );
  }
}

export default Fade;
