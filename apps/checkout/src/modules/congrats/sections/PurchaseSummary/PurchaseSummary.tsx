import React from 'react';
import styled from 'styled-components';
import {Picture} from 'vroom-ui/src/elements/Picture';
import {addStyleForMobile} from 'vroom-ui/src/foundation/themes/Vroom';
import {Body, Heading, Title} from 'vroom-ui/src/foundation/Typography';
import PurchaseDetails, {PurchaseDetailsProps} from "./components/PurchaseDetails";
import DepositInformation, {DepositInformationProps} from "./components/DepositInformation";
import BillingAddress, {BillingAddressProps} from "./components/BillingAddress";
import FinancingInformation, {FinancingInformationProps} from "./components/FinancingInformation";
import DeliveryAddress from "./components/DeliveryAddress";
import DeliveryDetails from "./components/DeliveryDetails";
import UploadedDocuments from "./components/UploadedDocuments";
import RegistrationAddress from "./components/RegistrationAddress";

interface Props {
    purchaseDetails: PurchaseDetailsProps,
    depositInformation: DepositInformationProps,
    billingAddress: BillingAddressProps,
    financingInformation: FinancingInformationProps
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

const PurchaseSummary: React.FC<Props> = () => {
    const purchaseDetails = {
        data: {
            method: 'Finance with Vroom',
            sellingPrice: 28750.00,
            taxes: 2371.87,
            vehicleServiceContractProtection: 3244.00,
            gapCoverage: 645.00,
            tireAndWheelCoverage: 643.00,
            shippingFee: 599.00,
            subtotal: 22486.98,
            creditDownPayment: 500.00,
            total: 35153.98
        }
    }

    const depositInformation = {
        data: {
            amount: 500.00,
            creditCard: '***1234',
        }
    };

    const billingAddress = {
        data: {
            address: {
                name: 'Paul Henry',
                address: '1021 Monterey Salinas Hwy',
                cityStateZip: 'Salina, CA 93980'
            }
        }
    };

    const registrationAddress = {
        data: {
            address: {
                name: 'Paul Henry',
                address: '1021 Monterey Salinas Hwy',
                cityStateZip: 'Salina, CA 93980'
            }
        }
    };

    const deliveryAddress = {
        data: {
            address: {
                name: 'Paul Henry',
                address: '1021 Monterey Salinas Hwy',
                cityStateZip: 'Salina, CA 93980'
            }
        }
    };

    const financingInformation = {
        data: {
            downPayment: 5000,
            bank: 'Chase',
            apr: 'TBD',
            financeTerm: 'TBD',
            numberOfPayments: 'TBD',
            financeCharge: 'TBD',
            monthlyPayment: 287
        }
    };

    return (
        <Container>
            <Content>
                <Header>
                    <Heading.Three>Purchase summary</Heading.Three>
                    <Body.Small>Transaction placed on November 4, 2020</Body.Small>
                </Header>
                <Car>
                    <CarImage>
                        <Picture alt="car" src="" width="182px" height="104px"/>
                    </CarImage>
                    <CarInfo>
                        <Make>2018 Land Rover Range Rover Sport</Make>
                        <Body.Regular>SE</Body.Regular>
                        <Body.Regular>20,818 miles</Body.Regular>
                    </CarInfo>
                </Car>
                <PurchaseDetails data={purchaseDetails.data}/>
                <Space/>
                <DepositInformation data={depositInformation.data}/>
                <Space/>
                <BillingAddress data={billingAddress.data}/>
                <Space/>
                <FinancingInformation data={financingInformation.data}/>
                <Space/>
                <RegistrationAddress data={registrationAddress.data}/>
                <Space/>
                <DeliveryAddress data={deliveryAddress.data}/>
                <Space/>
                <DeliveryDetails/>
                <Space/>
                <UploadedDocuments/>
                <Space/>
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
