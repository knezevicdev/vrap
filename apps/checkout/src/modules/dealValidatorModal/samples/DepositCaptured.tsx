import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 350px;
  min-width: 200px;
`;

const DepositCaptured: React.FC = (): JSX.Element => {
  return <Container>Deposit Captured Purchase Content</Container>;
};

export default DepositCaptured;
