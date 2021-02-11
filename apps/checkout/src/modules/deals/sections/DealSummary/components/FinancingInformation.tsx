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

const Property = styled(Body.Regular)`
  margin-right: 8px;
`;

const Value = styled(Body.Regular)`
  text-align: right;
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
          <Property>Down Payment</Property>
          <Value>{buildPrice(downPayment)}</Value>
        </Row>
        <Row>
          <Property>Financing Bank</Property>
          <Value>{bank}</Value>
        </Row>
        <Row>
          <Property>APR</Property>
          <Value>{`${(apr * 100).toFixed(2)}%`}</Value>
        </Row>
        <Row>
          <Property>Finance Term</Property>
          <Value>{financeTerm ? `${financeTerm} months` : `-`}</Value>
        </Row>
        <Row>
          <Property>Number of payments</Property>
          <Value>{numberOfPayments}</Value>
        </Row>
        <Row>
          <Property>Amount Financed</Property>
          <Value>{buildPrice(amountFinanced)}</Value>
        </Row>
        <Row>
          <Property>Finance charge</Property>
          <Value>{buildPrice(financeCharge)}</Value>
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
