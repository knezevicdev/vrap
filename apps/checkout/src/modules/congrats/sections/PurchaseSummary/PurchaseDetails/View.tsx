import React from 'react';
import styled from 'styled-components';
import Icon, { Icons } from 'vroom-ui/src/elements/Icon/Icon';
import { ThemeProps } from 'vroom-ui/src/foundation/themes/types';
import { Body, Title } from 'vroom-ui/src/foundation/Typography';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
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

const View: React.FC<Props> = () => {
  return (
    <Container>
      <Header>Purchase details</Header>
      <Row>
        <Title.Three>Payment method</Title.Three>
        <Title.Three>Finance with Vroom</Title.Three>
      </Row>
      <Divider />
      <Section>
        <Row>
          <Body.Regular>Selling price</Body.Regular>
          <BodyRegularBold>$28,750.00</BodyRegularBold>
        </Row>
        <Row>
          <TextWithHelp>
            <Body.Regular>Taxes and fees</Body.Regular>
            <InfoIcon icon={Icons.FEEDBACK_INFO} />
          </TextWithHelp>
          <BodyRegularBold>$2,371.87</BodyRegularBold>
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
        <Row>
          <TextWithHelp>
            <Body.Regular>Vehicle Service Contract Protection</Body.Regular>
            <InfoIcon icon={Icons.FEEDBACK_INFO} />
          </TextWithHelp>
          <BodyRegularBold>$3,244.00</BodyRegularBold>
        </Row>
        <Details>60 mos. / 60,000 mi. / $100 ded.</Details>
        <Row>
          <TextWithHelp>
            <Body.Regular>GAP Coverage</Body.Regular>
            <InfoIcon icon={Icons.FEEDBACK_INFO} />
          </TextWithHelp>
          <BodyRegularBold>$645.00</BodyRegularBold>
        </Row>
        <Details>60 mos. / 60,000 mi. / $100 ded.</Details>
        <Row>
          <TextWithHelp>
            <Body.Regular>Tire & Wheel Coverage</Body.Regular>
            <InfoIcon icon={Icons.FEEDBACK_INFO} />
          </TextWithHelp>
          <BodyRegularBold>$643.00</BodyRegularBold>
        </Row>
        <Details>60 mos. / 60,000 mi. / $100 ded.</Details>
        <Row>
          <Body.Regular>Shipping Fee</Body.Regular>
          <BodyRegularBold>$599.00</BodyRegularBold>
        </Row>
      </Section>
      <Divider />
      <Section>
        <Row>
          <Body.Regular>Subtotal</Body.Regular>
          <BodyRegularBold>$22,486.98</BodyRegularBold>
        </Row>
        <Row>
          <Body.Regular>Credit down payment</Body.Regular>
          <BodyRegularBold>-$500.00</BodyRegularBold>
        </Row>
      </Section>
      <Divider />
      <Row>
        <Due>Total balance due</Due>
        <Due>$35,153.98</Due>
      </Row>
    </Container>
  );
};

export default View;
