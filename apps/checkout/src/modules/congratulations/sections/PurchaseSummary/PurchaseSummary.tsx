import {
  addStyleForMobile,
  Body,
  Heading,
  Picture,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import BillingAddress, {
  BillingAddressProps,
} from './components/BillingAddress';
import DeliveryAddress, {
  DeliveryAddressProps,
} from './components/DeliveryAddress';
import DeliveryDetails, {
  DeliveryDetailsProps,
} from './components/DeliveryDetails';
import DepositInformation, {
  DepositInformationProps,
} from './components/DepositInformation';
import FinancingInformation, {
  FinancingInformationProps,
} from './components/FinancingInformation';
import PurchaseDetails, {
  PurchaseDetailsProps,
} from './components/PurchaseDetails';
import RegistrationAddress, {
  RegistrationAddressProps,
} from './components/RegistrationAddress';
import UploadedDocuments from './components/UploadDocuments';
import { UploadedDocumentsProps } from './components/UploadDocuments/ViewModel';
export interface PurchaseSummaryProps {
  summary: {
    date: string;
    car: {
      image: {
        src: string;
        alt: string;
      };
      yearMakeAndModel: string;
      trim: string;
      miles: string;
    };
  };
  purchaseDetails: PurchaseDetailsProps;
  depositInformation: DepositInformationProps;
  billingAddress: BillingAddressProps;
  financingInformation?: FinancingInformationProps;
  registrationAddress: RegistrationAddressProps;
  deliveryAddress: DeliveryAddressProps;
  deliveryDetails: DeliveryDetailsProps;
  documentsUploaded: UploadedDocumentsProps;
}

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 64px;
  padding-top: 64px;
  background: ${primaryWhite};
  ${addStyleForMobile(`
        padding: 0 16px;
        padding-top: 32px;
   `)}
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 640px;
`;

const Car = styled.div`
  display: flex;
  margin-bottom: 32px;
  align-items: center;

  ${addStyleForMobile(`
        margin-bottom: 52px;
    `)}
`;

const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
`;

const Make = styled(Title.Three)`
  line-height: 24px !important;
`;

const CarImage = styled.div`
  min-width: 182px;
  max-width: 182px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 32px;
`;

const Space = styled.div`
  margin-top: 64px;
`;

const ShouldKnow = styled(Body.Regular)`
  margin-bottom: 16px;
`;

const PurchaseSummary: React.FC<PurchaseSummaryProps> = ({
  summary: { date, car },
  purchaseDetails,
  depositInformation,
  billingAddress,
  financingInformation,
  registrationAddress,
  deliveryAddress,
  deliveryDetails,
  documentsUploaded,
}) => {
  return (
    <Container>
      <Content>
        <Header>
          <Heading.Three>Purchase summary</Heading.Three>
          <Body.Small>Transaction placed on {date}</Body.Small>
        </Header>
        <Car>
          <CarImage>
            <Picture
              alt={car.image.alt}
              src={car.image.src}
              width="182px"
              height="104px"
              objectFit="contain"
            />
          </CarImage>
          <CarInfo>
            <Make>{car.yearMakeAndModel}</Make>
            <Body.Regular>{car.trim}</Body.Regular>
            <Body.Regular>{car.miles}</Body.Regular>
          </CarInfo>
        </Car>
        <PurchaseDetails {...purchaseDetails} />
        <Space />
        {financingInformation && (
          <>
            <FinancingInformation {...financingInformation} />
            <Space />
          </>
        )}
        <DepositInformation {...depositInformation} />
        <Space />
        <BillingAddress {...billingAddress} />
        <Space />
        <RegistrationAddress {...registrationAddress} />
        <Space />
        <DeliveryAddress {...deliveryAddress} />
        <Space />
        <DeliveryDetails {...deliveryDetails} />
        <Space />
        {documentsUploaded.documents.length !== 0 && (
          <>
            <UploadedDocuments {...documentsUploaded} />
            <Space />
          </>
        )}

        <ShouldKnow>
          <Body.Regular bold>You Should Know:</Body.Regular> We’ve done our best
          to estimate the taxes and registration fees here but the final amounts
          are determined by the government. Your monthly payment might also vary
          slightly depending on the number of days between contract signing and
          the first payment date.
        </ShouldKnow>
        <ShouldKnow>
          Individual products or combinations of product options may exceed the
          approved amount financed and could impact your lender selection or
          other financing terms. A Vroom specialist will help you determine what
          options are available to you.
        </ShouldKnow>
        <Body.Regular>
          This sale is not final until the parties have signed a Retail Purchase
          Agreement and a Retail Installment Sales Contract (if applicable), and
          complete a review and approval process.
        </Body.Regular>
      </Content>
    </Container>
  );
};

export default PurchaseSummary;
