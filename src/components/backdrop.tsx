/**
 * A Backdrop component takes in a background and a foreground component.
 * The second component is the foreground component and is rendered on top
 * of the background component. The background component is resized to match
 * the height of the foreground component after rendering.
 */
import React, {
  useEffect,
  useState,
  createRef,
  ReactNode,
  FC,
  forwardRef,
  RefObject,
} from 'react';
import Container from '@material-ui/core/Container';

interface BackdropProps {
  children: [ReactNode, ReactNode];
}

interface BackgroundProps {
  height: number;
  children: ReactNode;
}

const BackgroundContainer: FC<BackgroundProps> = forwardRef<
  any,
  BackgroundProps
>(({ height, children }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: '0px',
        right: '0px',
        height: '100vh',
        zIndex: 1,
        width: '100vw',
        margin: '0px',
        padding: '0px',
      }}
    >
      {children}
    </div>
  );
});

interface ForegroundProps {
  children: ReactNode;
  ref?: RefObject<any>;
}
const ForegroundContainer: FC<ForegroundProps> = forwardRef<
  any,
  ForegroundProps
>(({ children }, ref) => {
  return (
    <Container
      ref={ref}
      style={{
        position: 'absolute',
        right: '0 px',
        top: '0 px',
        zIndex: 2,
        margin: '0px',
        padding: '0px',
      }}
    >
      {children}
    </Container>
  );
});

const Backdrop: FC<BackdropProps> = ({ children }) => {
  let [foregroundRef, _] = useState(createRef<any>());

  let [height, setHeight] = useState(0);

  useEffect(() => {
    const callback = () => setHeight(foregroundRef.current.clientHeight);
    window.addEventListener('resize', callback);
    callback();
  });

  return (
    <div
      style={{
        position: 'relative',
        height: height,
        width: '100%',
        clear: 'both',
        margin: '0px',
        padding: '0px',
      }}
    >
      <BackgroundContainer height={height}>{children[0]}</BackgroundContainer>
      <ForegroundContainer ref={foregroundRef}>
        {children[1]}
      </ForegroundContainer>
    </div>
  );
};

export default Backdrop;
