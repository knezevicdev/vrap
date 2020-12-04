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
import {addStyleForMobile} from "vroom-ui/src/foundation/themes/Vroom";

interface Props {
    viewModel: ViewModel;
}

const Container = styled.div`
  display:flex;
  justify-content: center;
`;

const Content = styled.div`
  display:flex;
  flex-direction: column;
  max-width: 640px;
`;

const Car = styled.div`
  display:flex;
  margin-bottom: 32px;
  align-items: center;
  
    ${addStyleForMobile(`
        margin-bottom: 52px;
    `)}
`;

const CarInfo = styled.div`
  display:flex;
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

const View: React.FC<Props> = () => {
    return (
        <Container>
            <Content>
                <Header>
                    <Heading.Three>Purchase summary</Heading.Three>
                    <Body.Small>Transaction placed on November 4, 2020</Body.Small>
                </Header>
                <Car>
                    <CarImage>
                        <Picture alt='car' src='' width="182px" height="104px"/>
                    </CarImage>
                    <CarInfo>
                        <Make>2018 Land Rover Range Rover Sport</Make>
                        <Body.Regular>SE</Body.Regular>
                        <Body.Regular>20,818 miles</Body.Regular>
                    </CarInfo>
                </Car>
                <PurchaseDetails/>
                <Space/>
                <DepositInformation/>
                <Space/>
                <BillingAddress/>
                <Space/>
                <FinancingInformation/>
                <Space/>
                <RegistrationAddress/>
                <Space/>
                <DeliveryAddress/>
                <Space/>
                <DeliveryDetails/>
                <Space/>
                <UploadedDocuments/>
                <Space/>
                <ShouldKnow><BodyRegularBold>You Should Know:</BodyRegularBold> We’ve done our best to estimate the
                    taxes and registration fees here but the final amounts are determined by the government. Your
                    monthly payment might also vary slightly depending on the number of days between contract signing
                    and the first payment date. </ShouldKnow>
                <ShouldKnow>Individual products or combinations of product options may exceed the approved amount
                    financed and could impact your lender selection or other financing terms. A Vroom specialist will
                    help you determine what options are available to you.</ShouldKnow>
                <Body.Regular>This sale is not final until the parties have signed a Retail Purchase Agreement and a
                    Retail Installment Sales Contract (if applicable), and complete a review and approval
                    process.</Body.Regular>
            </Content>
        </Container>
    );
};

export default View;
