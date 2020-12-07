import React from 'react';
import styled from 'styled-components';
import { Picture } from 'vroom-ui/src/elements/Picture';
import { addStyleForMobile } from 'vroom-ui/src/foundation/themes/Vroom';
import { Body, Heading, Title } from 'vroom-ui/src/foundation/Typography';

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
import UploadedDocuments from './components/UploadedDocuments';

interface Props {
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
  financingInformation: FinancingInformationProps;
  registrationAddress: RegistrationAddressProps;
  deliveryAddress: DeliveryAddressProps;
  deliveryDetails: DeliveryDetailsProps;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
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

const BodyRegularBold = styled(Body.Regular)`
  font-weight: 600 !important;
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

const PurchaseSummary: React.FC<Props> = ({
  summary: { date, car },
  purchaseDetails,
  depositInformation,
  billingAddress,
  financingInformation,
  registrationAddress,
  deliveryAddress,
  deliveryDetails,
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
            />
          </CarImage>
          <CarInfo>
            <Make>{car.yearMakeAndModel}</Make>
            <Body.Regular>{car.trim}</Body.Regular>
            <Body.Regular>{car.miles}</Body.Regular>
          </CarInfo>
        </Car>
        <PurchaseDetails data={purchaseDetails.data} />
        <Space />
        <DepositInformation data={depositInformation.data} />
        <Space />
        <BillingAddress data={billingAddress.data} />
        <Space />
        <FinancingInformation data={financingInformation.data} />
        <Space />
        <RegistrationAddress data={registrationAddress.data} />
        <Space />
        <DeliveryAddress data={deliveryAddress.data} />
        <Space />
        <DeliveryDetails data={deliveryDetails.data} />
        <Space />
        <UploadedDocuments showInsuranceDisclaimer={true} />
        <Space />
        <ShouldKnow>
          <BodyRegularBold>You Should Know:</BodyRegularBold> We’ve done our
          best to estimate the taxes and registration fees here but the final
          amounts are determined by the government. Your monthly payment might
          also vary slightly depending on the number of days between contract
          signing and the first payment date.
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
