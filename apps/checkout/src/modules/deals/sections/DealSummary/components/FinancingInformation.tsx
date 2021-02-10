import { Body, ThemeProps, Title } from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import { FinancingProps } from '../types';
import { buildPrice } from './buildPrice';

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
`;

const Header = styled(Body.Regular)`
  font-size: 16px;
  text-transform: uppercase;
  line-height: 1.63;
  margin-top: 40px;
`;

const Divider = styled.div`
  min-height: 1px;
  max-height: 1px;
  min-width: 100%;
  max-width: 100%;
  background: ${grayThree};
  margin: 16px 0;
`;

const Payment = styled(Title.Three)`
  color: ${primaryBrand};
`;

const FinancingInformation = (props: FinancingProps): JSX.Element => {
  const {
    downPayment,
    bank,
    apr,
    financeTerm,
    numberOfPayments,
    amountFinanced,
    financeCharge,
    monthlyPayment,
  } = props;

  return (
    <Container>
      <Header bold>Financing Information</Header>
      <Divider />
      <Section>
        <Row>
          <Body.Regular>Down Payment</Body.Regular>
          <Body.Regular>{buildPrice(downPayment)}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Financing Bank</Body.Regular>
          <Body.Regular>{bank}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>APR</Body.Regular>
          <Body.Regular>{`${(apr * 100).toFixed(2)}%`}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Finance Term</Body.Regular>
          <Body.Regular>
            {financeTerm ? `${financeTerm} months` : `-`}
          </Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Number of payments</Body.Regular>
          <Body.Regular>{numberOfPayments}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Amount Financed</Body.Regular>
          <Body.Regular>{buildPrice(amountFinanced)}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Finance charge</Body.Regular>
          <Body.Regular>{buildPrice(financeCharge)}</Body.Regular>
        </Row>
      </Section>
      <Divider />
      <Row>
        <Payment>Monthly payment</Payment>
        <Payment>{buildPrice(monthlyPayment)}</Payment>
      </Row>
    </Container>
  );
};

export default FinancingInformation;
