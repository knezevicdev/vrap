import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 350px;
  min-width: 200px;
`;

const PendingPurchase: React.FC = (): JSX.Element => {
  return <Container>Pending Purchase Content</Container>;
};

export default PendingPurchase;
