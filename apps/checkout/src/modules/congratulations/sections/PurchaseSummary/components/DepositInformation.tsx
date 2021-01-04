import React from 'react';
import styled from 'styled-components';
import { Body, Title } from '@vroom-web/temp-ui-alias-for-checkout';

export interface DepositInformationProps {
  data: {
    amount: string;
    creditCard: string;
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  ${Row}:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const DepositInformation: React.FC<DepositInformationProps> = ({ data }) => {
  const { amount, creditCard } = data;
  return (
    <Container>
      <Title.One>Reservation deposit information</Title.One>
      <Section>
        <Row>
          <Body.Regular>Amount</Body.Regular>
          <Body.Regular bold>{amount}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Credit card</Body.Regular>
          <Body.Regular bold>{creditCard}</Body.Regular>
        </Row>
      </Section>
    </Container>
  );
};

export default DepositInformation;
