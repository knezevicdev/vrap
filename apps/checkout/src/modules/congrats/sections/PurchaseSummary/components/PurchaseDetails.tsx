import React from 'react';
import styled from 'styled-components';
import Icon, { Icons } from 'vroom-ui/src/elements/Icon/Icon';
import { ThemeProps } from 'vroom-ui/src/foundation/themes/types';
import { Body, Title } from 'vroom-ui/src/foundation/Typography';

export interface PurchaseDetailsProps {
  data: {
    method: string;
    sellingPrice: string;
    taxes: string;
    vehicleServiceContractProtection?: string;
    gapCoverage?: string;
    tireAndWheelCoverage?: string;
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

const BodyRegularBold = styled(Body.Regular)`
  font-weight: 600 !important;
`;

const Details = styled(Body.Small)`
  font-weight: 600 !important;
  margin-top: -4px;
  margin-bottom: 8px;
`;

const TextWithHelp = styled.div`
  display: flex;
  align-items: center;
`;

const Header = styled(Title.One)`
  margin-bottom: 16px;
`;

const InfoIcon = styled(Icon)`
  margin-left: 8px;
  cursor: pointer;
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
          <BodyRegularBold>{sellingPrice}</BodyRegularBold>
        </Row>
        <Row>
          <TextWithHelp>
            <Body.Regular>Taxes and fees</Body.Regular>
            <InfoIcon icon={Icons.FEEDBACK_INFO} />
          </TextWithHelp>
          <BodyRegularBold>{taxes}</BodyRegularBold>
        </Row>
        <Row>
          <TextWithHelp>
            <Body.Regular>90-Day Limited Warranty</Body.Regular>
            <InfoIcon icon={Icons.FEEDBACK_INFO} />
          </TextWithHelp>
          <BodyRegularBold>Included</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>1-Year roadside assistance</Body.Regular>
          <BodyRegularBold>Included</BodyRegularBold>
        </Row>
        {vehicleServiceContractProtection && (
          <>
            <Row>
              <TextWithHelp>
                <Body.Regular>Vehicle Service Contract Protection</Body.Regular>
                <InfoIcon icon={Icons.FEEDBACK_INFO} />
              </TextWithHelp>
              <BodyRegularBold>
                {vehicleServiceContractProtection}
              </BodyRegularBold>
            </Row>
            <Details>60 mos. / 60,000 mi. / $100 ded.</Details>
          </>
        )}
        {gapCoverage && (
          <>
            <Row>
              <TextWithHelp>
                <Body.Regular>GAP Coverage</Body.Regular>
                <InfoIcon icon={Icons.FEEDBACK_INFO} />
              </TextWithHelp>
              <BodyRegularBold>{gapCoverage}</BodyRegularBold>
            </Row>
            <Details>60 mos. / 60,000 mi. / $100 ded.</Details>
          </>
        )}
        {tireAndWheelCoverage && (
          <>
            <Row>
              <TextWithHelp>
                <Body.Regular>Tire & Wheel Coverage</Body.Regular>
                <InfoIcon icon={Icons.FEEDBACK_INFO} />
              </TextWithHelp>
              <BodyRegularBold>{tireAndWheelCoverage}</BodyRegularBold>
            </Row>
            <Details>60 mos. / 60,000 mi. / $100 ded.</Details>
          </>
        )}
        <Row>
          <Body.Regular>Shipping Fee</Body.Regular>
          <BodyRegularBold>{shippingFee}</BodyRegularBold>
        </Row>
      </Section>
      <Divider />
      <Section>
        <Row>
          <Body.Regular>Subtotal</Body.Regular>
          <BodyRegularBold>{subtotal}</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Credit down payment</Body.Regular>
          <BodyRegularBold>{creditDownPayment}</BodyRegularBold>
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
