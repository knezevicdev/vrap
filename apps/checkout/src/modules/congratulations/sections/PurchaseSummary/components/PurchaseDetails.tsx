import {
  Body,
  Link,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

interface Service {
  cost: string;
  summary: string;
}

export interface PurchaseDetailsProps {
  data: {
    method: string;
    sellingPrice: string;
    taxes: string;
    vehicleServiceContractProtection?: Service;
    gapCoverage?: Service;
    tireAndWheelCoverage?: Service;
    shippingFee?: string;
    subtotal: string;
    creditDownPayment: string;
    total: string;
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
  ${Row}:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Details = styled(Body.Small)`
  font-weight: 600 !important;
  margin-top: -4px;
  margin-bottom: 8px;
`;

const Header = styled(Title.One)`
  margin-bottom: 16px;
`;

const Divider = styled.div`
  min-height: 1px;
  max-height: 1px;
  min-width: 100%;
  max-width: 100%;
  background: ${grayThree};
  margin: 16px 0;
`;

const Due = styled(Title.Two)`
  color: ${primaryBrand} !important;
`;

const BrandLink = styled(Link)`
  color: ${primaryBrand} !important;
`;

const PurchaseDetails: React.FC<PurchaseDetailsProps> = ({ data }) => {
  const {
    method,
    sellingPrice,
    taxes,
    vehicleServiceContractProtection,
    gapCoverage,
    tireAndWheelCoverage,
    shippingFee,
    subtotal,
    creditDownPayment,
    total,
  } = data;

  return (
    <Container>
      <Header>Purchase details</Header>
      <Row>
        <Title.Three>Payment method</Title.Three>
        <Title.Three>{method}</Title.Three>
      </Row>
      <Divider />
      <Section>
        <Row>
          <Body.Regular>Selling price</Body.Regular>
          <Body.Regular bold>{sellingPrice}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Taxes and fees</Body.Regular>
          <Body.Regular bold>{taxes}</Body.Regular>
        </Row>
        <Row>
          <BrandLink blank href="https://vroom.com/protection">
            90-Day Limited Warranty
          </BrandLink>
          <Body.Regular bold>Included</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>1-Year roadside assistance</Body.Regular>
          <Body.Regular bold>Included</Body.Regular>
        </Row>
        {vehicleServiceContractProtection && (
          <>
            <Row>
              <BrandLink
                blank
                href="https://vroom.zendesk.com/hc/en-us/articles/205444915-What-is-Vroom-Protect-"
              >
                Vehicle Service Contract Protection
              </BrandLink>
              <Body.Regular bold>
                {vehicleServiceContractProtection.cost}
              </Body.Regular>
            </Row>
            <Details>{vehicleServiceContractProtection.summary}</Details>
          </>
        )}
        {gapCoverage && (
          <>
            <Row>
              <BrandLink
                blank
                href="https://vroom.zendesk.com/hc/en-us/articles/204740399-What-does-GAP-protection-cover-"
              >
                GAP Coverage
              </BrandLink>
              <Body.Regular bold>{gapCoverage.cost}</Body.Regular>
            </Row>
            <Details>{gapCoverage.summary}</Details>
          </>
        )}
        {tireAndWheelCoverage && (
          <>
            <Row>
              <BrandLink
                blank
                href="https://vroom.zendesk.com/hc/en-us/articles/360033879711-What-is-Tire-Wheel-Protection-"
              >
                Tire & Wheel Coverage
              </BrandLink>
              <Body.Regular bold>{tireAndWheelCoverage.cost}</Body.Regular>
            </Row>
            <Details>{tireAndWheelCoverage.summary}</Details>
          </>
        )}
        <Row>
          <Body.Regular>Shipping Fee</Body.Regular>
          <Body.Regular bold>{shippingFee}</Body.Regular>
        </Row>
      </Section>
      <Divider />
      <Section>
        <Row>
          <Body.Regular>Subtotal</Body.Regular>
          <Body.Regular bold>{subtotal}</Body.Regular>
        </Row>
        <Row>
          <Body.Regular>Credit down payment</Body.Regular>
          <Body.Regular bold>{creditDownPayment}</Body.Regular>
        </Row>
      </Section>
      <Divider />
      <Row>
        <Due>Total balance due</Due>
        <Due>{total}</Due>
      </Row>
    </Container>
  );
};

export default PurchaseDetails;
