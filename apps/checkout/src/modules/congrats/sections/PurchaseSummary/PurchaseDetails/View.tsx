import React from 'react';

import ViewModel from './ViewModel';
import styled from "styled-components";
import {Body, Title} from "vroom-ui/src/foundation/Typography";
import Icon, {Icons} from "vroom-ui/src/elements/Icon/Icon";
import {ThemeProps} from "vroom-ui/src/foundation/themes/types";

interface Props {
    viewModel: ViewModel;
}
const grayThree = (props: { theme: ThemeProps }): string =>
    props.theme.colors.gray.three;

const Container = styled.div`
  display:flex;
  flex-direction: column;
`;

const Row = styled.div`
  display:flex;
  justify-content: space-between;
`;

const BodyRegularBold = styled(Body.Regular)`
  font-weight: 600 !important;
`;

const BodySmallBold = styled(Body.Small)`
  font-weight: 600 !important;
`;

const TextWithHelp = styled.div`
  display: flex;
`;

const Divider = styled.div`
    min-height: 1px;
    max-height: 1px;
    min-width: 100%;
    max-width: 100%;
    background: ${grayThree};
    margin: 16px 0;
`

const View: React.FC<Props> = () => {
    return (
        <Container>
            <Title.One>Purchase details</Title.One>
            <Row>
                <Title.Three>Payment method</Title.Three>
                <Title.Three>Finance with Vroom</Title.Three>
            </Row>
            <Divider/>
            <Row>
                <Body.Regular>Selling price</Body.Regular>
                <BodyRegularBold>$28,750.00</BodyRegularBold>
            </Row>
            <Row>
                <TextWithHelp>
                    <Body.Regular>Taxes and fees</Body.Regular>
                    <Icon icon={Icons.FEEDBACK_INFO}/>
                </TextWithHelp>
                <BodyRegularBold>$2,371.87</BodyRegularBold>
            </Row>
            <Row>
                <TextWithHelp>
                    <Body.Regular>90-Day Limited Warranty</Body.Regular>
                    <Icon icon={Icons.FEEDBACK_INFO}/>
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
                    <Icon icon={Icons.FEEDBACK_INFO}/>
                </TextWithHelp>
                <BodyRegularBold>$3,244.00</BodyRegularBold>
            </Row>
            <BodySmallBold>60 mos. / 60,000 mi. / $100 ded.</BodySmallBold>
            <Row>
                <TextWithHelp>
                    <Body.Regular>GAP Coverage</Body.Regular>
                    <Icon icon={Icons.FEEDBACK_INFO}/>
                </TextWithHelp>
                <BodyRegularBold>$645.00</BodyRegularBold>
            </Row>
            <BodySmallBold>60 mos. / 60,000 mi. / $100 ded.</BodySmallBold>
            <Row>
                <TextWithHelp>
                    <Body.Regular>Tire & Wheel Coverage</Body.Regular>
                    <Icon icon={Icons.FEEDBACK_INFO}/>
                </TextWithHelp>
                <BodyRegularBold>$643.00</BodyRegularBold>
            </Row>
            <BodySmallBold>60 mos. / 60,000 mi. / $100 ded.</BodySmallBold>
            <Row>
                <Body.Regular>Shipping Fee</Body.Regular>
                <BodyRegularBold>$599.00</BodyRegularBold>
            </Row>
            <Divider/>
            <Row>
                <Body.Regular>Subtotal</Body.Regular>
                <BodyRegularBold>$22,486.98</BodyRegularBold>
            </Row>
            <Row>
                <Body.Regular>Credit down payment</Body.Regular>
                <BodyRegularBold>-$500.00</BodyRegularBold>
            </Row>
            <Divider/>
            <Row>
                <Title.Two>Total balance due</Title.Two>
                <Title.Two>$35,153.98</Title.Two>
            </Row>
        </Container>
    );
};

export default View;
