import React from 'react';

import ViewModel from './ViewModel';
import {Body, Title} from "vroom-ui/src/foundation/Typography";
import styled from "styled-components";

interface Props {
  viewModel: ViewModel;
}
const Container = styled.div`
  display:flex;
  flex-direction: column;
`;

const Row = styled.div`
  display:flex;
  justify-content: space-between;
`;

const BodyRegularBold = styled(Body.Regular)`
  font-weight: 600 !important;
`;

const View: React.FC<Props> = () => {
  return (
      <Container>
        <Title.One>Reservation deposit information</Title.One>
        <Row>
          <Body.Regular>Amount</Body.Regular>
          <BodyRegularBold>$500.00</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Credit card</Body.Regular>
          <BodyRegularBold>***1234</BodyRegularBold>
        </Row>
      </Container>
  );
};

export default View;
