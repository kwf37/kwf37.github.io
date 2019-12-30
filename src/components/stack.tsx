import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';

interface BackgroundProps {
  children: React.ReactNode;
}

const BGDiv = styled.div({
  position: 'absolute',
  zIndex: 1,
});

const FGDiv = styled.div({
  position: 'relative',
  zIndex: 2,
});

const Stack: React.FC<BackgroundProps> = ({ children }) => {
  return <Container></Container>;
};

export default Stack;
