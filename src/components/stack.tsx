import React, { useEffect, createRef } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { number } from 'prop-types';
import { AutoComplete } from 'material-ui';

interface BackgroundProps {
  children: React.ReactNode;
}

interface PositionProps {
  z: number;
  children: React.ReactNode;
  height?: number; // Can override height from parent node
  ref?: React.RefObject<any>;
}

const PositionedContainer: React.FC<PositionProps> = React.forwardRef<
  any,
  PositionProps
>(({ z, children, height }, ref) => {
  if (height) {
    return (
      <Container
        ref={ref}
        style={{
          position: 'absolute',
          right: '0 px',
          top: '0 px',
          height: height,
          zIndex: z,
        }}
      >
        {children}
      </Container>
    );
  } else
    return (
      <Container
        ref={ref}
        style={{
          position: 'absolute',
          right: '0 px',
          top: '0 px',
          height: 'auto',
          zIndex: z,
        }}
      >
        {children}
      </Container>
    );
});

const Stack: React.FC<BackgroundProps> = ({ children }) => {
  const childRefs: Array<React.RefObject<any>> = [];
  //React.Dispatch<React.SetStateAction<React.RefObject<any>>>
  React.Children.forEach(children, (_, i) => {
    let [ref, _setState] = React.useState(React.createRef<any>());
    childRefs[i] = ref;
  });

  let [height, setHeight] = React.useState(0);

  useEffect(() => {
    let max = 0;
    childRefs.forEach(ref => {
      if (max < ref.current.clientHeight) {
        max = ref.current.clientHeight;
      }
    });
    setHeight(max);
  });

  return (
    <div
      style={{
        position: 'relative',
        height: height,
        width: '100%',
        display: 'inline-block',
        clear: 'both',
      }}
    >
      {children &&
        React.Children.map(children, (child, index) => {
          //ref={React.createRef<any>()}
          return (
            <PositionedContainer
              z={index}
              ref={childRefs[index]}
              {...(height != 0 && { height: height })}
            >
              {child}
            </PositionedContainer>
          );
        })}
    </div>
  );
};

export default Stack;
