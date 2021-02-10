import {
  Body,
  Icon,
  Icons,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import { DealProps, DealTradeProps } from '../types';
import AdditionalProducts from './AdditionalProducts/index';
import { buildPrice } from './buildPrice';
import FinancingInformation from './FinancingInformation';
import ToolTipLink from './ToolTipLink';

import ToolTip from 'src/modules/common/ToolTip';

const grayOne = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.one;

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

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

const ToolTipContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RegularText = styled(Body.Regular)`
  margin-right: 8px;
`;

const DueSubtitle = styled(Body.Small)`
  color: ${grayOne};
`;

interface Props {
  deal: DealProps;
  trades?: DealTradeProps;
}

const DealDetails = ({ deal, trades }: Props): JSX.Element => {
  const {
    method,
    taxes,
    additionalProducts,
    shippingFee,
    subtotal,
    financing,
    depositCaptured,
  } = deal;

  const PaymentMethod = (): JSX.Element => (
    <Row>
      <Property>Payment method:</Property>
      <Value bold>{method}</Value>
    </Row>
  );

  const LimitedWarranty = (): JSX.Element => (
    <Row>
      <ToolTipContainer>
        <RegularText>90-Day Limited Warranty</RegularText>
        <ToolTip
          component={<Icon icon={Icons.FEEDBACK_QUESTION} />}
          tooltipText={<ToolTipLink href="https://vroom.com/protection" />}
        />
      </ToolTipContainer>
      <Value>Included</Value>
    </Row>
  );

  const RoadsideAssistance = (): JSX.Element => (
    <Row>
      <ToolTipContainer>
        <RegularText>1-Year roadside assistance</RegularText>
        <ToolTip
          component={<Icon icon={Icons.FEEDBACK_QUESTION} />}
          tooltipText={<ToolTipLink href="https://vroom.com/protection" />}
        />
      </ToolTipContainer>
      <Value>Included</Value>
    </Row>
  );

  const TransactionTaxes = (): JSX.Element => (
    <Row>
      <ToolTipContainer>
        <RegularText>Taxes and fees</RegularText>
        <ToolTip
          component={<Icon icon={Icons.FEEDBACK_QUESTION} />}
          tooltipText="Taxes and fees are estimates and may change."
        />
      </ToolTipContainer>
      <Value>{buildPrice(taxes)}</Value>
    </Row>
  );

  const ShippingFee = (): JSX.Element => (
    <Row>
      <Property>Shipping Fee</Property>
      <Value>{buildPrice(shippingFee)}</Value>
    </Row>
  );

  const TradeInVehicle = ({
    vehicle: { year, make, model },
    credit,
    loanBalance,
  }: DealTradeProps): JSX.Element => (
    <>
      <Section>
        <Row>
          <Property>Trade-in Vehicle</Property>
          <Value>{`${year} ${make} ${model}`}</Value>
        </Row>
        <Row>
          <Property>Your Est. Trade-In Credit</Property>
          <Value>({buildPrice(credit)})</Value>
        </Row>
        {loanBalance && (
          <Row>
            <Property>Est. Remaining Loan Balance</Property>
            <Value>{buildPrice(loanBalance)}</Value>
          </Row>
        )}
      </Section>
      <Divider />
    </>
  );

  const SubTotal = (): JSX.Element => (
    <Row>
      <Title.Three>Est. subtotal</Title.Three>
      <Title.Three>{buildPrice(subtotal)}</Title.Three>
    </Row>
  );

  const DepositDue = (): JSX.Element => (
    <>
      <div>
        <Row>
          <Title.Three>Due Today</Title.Three>
          <Title.Three>$500</Title.Three>
        </Row>
        <DueSubtitle>Refundable deposit to hold this vehicle</DueSubtitle>
      </div>
      <Divider />
    </>
  );

  return (
    <>
      <Container>
        <Header bold>Vehicle Price Overview</Header>
        <Divider />
        <Section>
          <PaymentMethod />
          <LimitedWarranty />
          <RoadsideAssistance />
          {additionalProducts && <AdditionalProducts {...additionalProducts} />}
          <TransactionTaxes />
          <ShippingFee />
        </Section>
        <Divider />
        {trades && <TradeInVehicle {...trades} />}
        <SubTotal />
        <Divider />
        {!depositCaptured && <DepositDue />}
      </Container>
      {financing && <FinancingInformation {...financing} />}
    </>
  );
};

export default DealDetails;
