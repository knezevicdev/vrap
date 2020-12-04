import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from 'vroom-ui/src/foundation/themes/types';
import { Body, Title } from 'vroom-ui/src/foundation/Typography';


interface Props {
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

const BodyRegularBold = styled(Body.Regular)`
  font-weight: 600 !important;
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

const FinancingInformation: React.FC<Props> = () => {
  return (
    <Container>
      <Title.One>Financing information</Title.One>
      <Section>
        <Row>
          <Body.Regular>Downpayment</Body.Regular>
          <BodyRegularBold>-$5,000.00</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Financing Bank</Body.Regular>
          <BodyRegularBold>Chase</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>APR</Body.Regular>
          <BodyRegularBold>TBD</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Finance Term</Body.Regular>
          <BodyRegularBold>TBD</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Number of payments</Body.Regular>
          <BodyRegularBold>TBD</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Finance charge</Body.Regular>
          <BodyRegularBold>TBD</BodyRegularBold>
        </Row>
      </Section>
      <Divider />
      <Row>
        <Payment>Monthly payment</Payment>
        <Payment>$287.00</Payment>
      </Row>
    </Container>
  );
};

export default FinancingInformation;
