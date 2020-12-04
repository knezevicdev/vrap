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

const Section = styled.div`
  display:flex;
  flex-direction: column;
  margin-top: 8px;
  ${Row}:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const BodyRegularBold = styled(Body.Regular)`
  font-weight: 600 !important;
`;

const View: React.FC<Props> = () => {
    return (
        <Container>
            <Title.One>Reservation deposit information</Title.One>
            <Section>
                <Row>
                    <Body.Regular>Amount</Body.Regular>
                    <BodyRegularBold>$500.00</BodyRegularBold>
                </Row>
                <Row>
                    <Body.Regular>Credit card</Body.Regular>
                    <BodyRegularBold>***1234</BodyRegularBold>
                </Row>
            </Section>
        </Container>
    );
};

export default View;
