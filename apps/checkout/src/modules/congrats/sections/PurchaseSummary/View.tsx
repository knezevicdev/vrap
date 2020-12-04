import React from 'react';

import ViewModel from './ViewModel';
import styled from "styled-components";
import {Heading, Body, Title} from 'vroom-ui/src/foundation/Typography';
import {Picture} from "vroom-ui/src/elements/Picture";
import PurchaseDetails from "./PurchaseDetails";
import DepositInformation from "./DepositInformation";
import BillingAddress from "./BillingAddress";
import FinancingInformation from "./FinancingInformation";
import DeliveryAddress from "./DeliveryAddress";
import RegistrationAddress from "./RegistrationAddress";
import DeliveryDetails from "./DeliveryDetails";
import UploadedDocuments from "./UploadedDocuments";

interface Props {
    viewModel: ViewModel;
}

const Container = styled.div`
  display:flex;
  flex-direction: column;
  max-width: 640px;
`;

const Car = styled.div`
  display:flex;
  max-height: 104px;
`;

const CarInfo = styled.div`
  display:flex;
  flex-direction: column;
`;

const BodyRegularBold = styled(Body.Regular)`
  font-weight: 600 !important;
`;

const View: React.FC<Props> = () => {
    return (
        <Container>
            <Heading.Three>Purchase summary</Heading.Three>
            <Body.Small>Transaction placed on November 4, 2020</Body.Small>
            <Car>
                <Picture alt='car' src='/assets/car.png' width="182px" height="104px"/>
                <CarInfo>
                    <Title.Three>2018 Land Rover Range Rover Sport</Title.Three>
                    <Body.Regular>SE</Body.Regular>
                    <Body.Regular>20,818 miles</Body.Regular>
                </CarInfo>
            </Car>
            <PurchaseDetails/>
            <DepositInformation/>
            <BillingAddress/>
            <FinancingInformation/>
            <RegistrationAddress/>
            <DeliveryAddress/>
            <DeliveryDetails/>
            <UploadedDocuments/>
            <Body.Regular><BodyRegularBold>You Should Know:</BodyRegularBold>  We’ve done our best to estimate the taxes and registration fees here but the final amounts are determined by the government. Your monthly payment might also vary slightly depending on the number of days between contract signing and the first payment date. </Body.Regular>
            <Body.Regular>Individual products or combinations of product options may exceed the approved amount financed and could impact your lender selection or other financing terms. A Vroom specialist will help you determine what options are available to you.</Body.Regular>
            <Body.Regular>This sale is not final until the parties have signed a Retail Purchase Agreement and a Retail Installment Sales Contract (if applicable), and complete a review and approval process.</Body.Regular>
        </Container>
    );
};

export default View;
