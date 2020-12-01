import React from 'react';
import styled from 'styled-components';
import { ThemeProps } from 'vroom-ui/src/foundation/themes/types';
import { addStyleForMobile } from 'vroom-ui/src/foundation/themes/Vroom';
import { Body, Heading, Title } from 'vroom-ui/src/foundation/Typography';
import { Picture} from "vroom-ui/src/elements/Picture";
import Icon, {Icons} from "vroom-ui/src/elements/Icon/Icon";

interface Props {
}

const ReservedCar: React.FC<Props> = (): JSX.Element => {

    const heading = 'your car is reserved!';
    const car = '2018 Land Rover Range Rover Sport';

    return (
        <Container>
            <Heading.Two>{heading}</Heading.Two>
            <Picture
                alt="Car"
                src="/assets/car.png"
                width="205px"
                height="135px"
            />
            <Title.Two>{car}</Title.Two>
            <Steps>
                <Step>
                    <Icon icon={Icons.CHECKMARK_SMALL}/>
                    <Body.Regular>The email was sent to ph123@gmail.com.</Body.Regular>
                </Step>
                <Step>
                    <Icon icon={Icons.CHECKMARK_SMALL}/>
                    <Body.Regular>A Vroom representative will reach out to your phone number
                        +1 (212) 200-1000 within the next 24 hours of a business day. </Body.Regular>
                </Step>
                <Step>
                    <Icon icon={Icons.CHECKMARK_SMALL}/>
                    <Body.Regular>Schedule a time to talk with the Vroom team.</Body.Regular>
                </Step>
            </Steps>

        </Container>
    );
};

export default ReservedCar;

const grayFour = (props: { theme: ThemeProps }): string =>
    props.theme.colors.gray.four;

const primaryBrand = (props: { theme: ThemeProps }): string =>
    props.theme.colors.primary.brand;

const primaryWhite = (props: { theme: ThemeProps }): string =>
    props.theme.colors.primary.white;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
=  ${addStyleForMobile(`
        padding: 40px 0;
    `)}
`;

const Car = styled(Picture)`
    width: 205px;
    height: 135px;
`;

const Steps = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 465px;
    `;

const Step = styled.div`
    display: flex;
    `;