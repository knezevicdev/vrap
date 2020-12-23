import React from 'react';
import styled from 'styled-components';
import { Body, ThemeProps, Title } from '@vroom-web/temp-ui-alias-for-checkout';

export interface FinancingInformationProps {
  data: {
    downPayment: string;
    bank: string;
    apr: string;
    financeTerm: string;
    numberOfPayments: string;
    financeCharge: string;
    monthlyPayment: string;
  };
}

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
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  ${Row}:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Divider = styled.div`
  min-height: 1px;
  max-height: 1px;
  min-width: 100%;
  max-width: 100%;
  background: ${grayThree};
  margin: 16px 0;
`;

const Payment = styled(Title.Two)`
  color: ${primaryBrand} !important;
`;

const FinancingInformation: React.FC<FinancingInformationProps> = ({
  data,
}) => {
  const {
    downPayment,
    bank,
    apr,
    financeTerm,
    numberOfPayments,
    financeCharge,
    monthlyPayment,
  } = data;
  return (
    <Container>
      <Title.One>Financing information</Title.One>
      <Section>
        <Row>
          <Body.Regular>Down Payment</Body.Regular>
          <Body.Regular bold>{downPayment}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Financing Bank</Body.Regular>
          <Body.Regular bold>{bank}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>APR</Body.Regular>
          <Body.Regular bold>{apr}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Finance Term</Body.Regular>
          <Body.Regular bold>{financeTerm}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Number of payments</Body.Regular>
          <Body.Regular bold>{numberOfPayments}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Finance charge</Body.Regular>
          <Body.Regular bold>{financeCharge}</Body.Regular>
        </Row>
      </Section>
      <Divider />
      <Row>
        <Payment>Monthly payment</Payment>
        <Payment>{monthlyPayment}</Payment>
      </Row>
    </Container>
  );
};

export default FinancingInformation;
