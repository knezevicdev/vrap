import React from 'react';
import styled from 'styled-components';
import Icon, {Icons} from 'vroom-ui/src/elements/Icon/Icon';
import {Picture} from 'vroom-ui/src/elements/Picture';
import {ThemeProps} from 'vroom-ui/src/foundation/themes/types';
import {addStyleForMobile} from 'vroom-ui/src/foundation/themes/Vroom';
import {Body, Heading, Link, Title} from 'vroom-ui/src/foundation/Typography';

const primaryBrand = (props: { theme: ThemeProps }): string =>
    props.theme.colors.primary.brand;

const primaryWhite = (props: { theme: ThemeProps }): string =>
    props.theme.colors.primary.white;

const grayFour = (props: { theme: ThemeProps }): string =>
    props.theme.colors.gray.four;

const Background = styled.div`
  display: flex;
  background: linear-gradient(${primaryBrand} 70%, ${grayFour} 30%);
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  margin: 64px;
  box-shadow: 0px 4px 24px 4px rgba(0, 0, 0, 0.1);
  background: ${primaryWhite};
  ${addStyleForMobile(`
        padding: 16px;
   `)}
`;

const Content = styled.div`
  display: flex;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
`;

const CarPicture = styled.div`
  min-width: 285px;
  min-height: 190px;
  max-width: 285px;
  max-height: 190px;
  width: 28px;
  height: 190px;

  margin-top: 24px;

  ${addStyleForMobile(`
      min-width: 100%;
      min-height: inherit;
      max-width: 100%;
      max-height: inherit;
      width: 100%;
      height: auto;
   `)}
`;

const CarHeading = styled(Heading.Two)`
  ${addStyleForMobile(`
        font-size: 28px;
        line-height: 32px;
        text-align: center;
   `)}
`;

const Step = styled.div`
  display: flex;
  align-items: baseline;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 465px;
  ${Step}:not(:last-child) {
    margin-bottom: 8px;
  }
`;

const CarTitle = styled(Title.Two)`
  margin-top: 24px;
  margin-bottom: 16px;
  ${addStyleForMobile(`
        font-size: 18px;
        line-height: 26px;
        text-align: center;
   `)}
`;

const Check = styled(Icon)`
  margin-right: 8px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Schedule = styled(Link)`
  color: ${primaryBrand} !important;
`;

interface Props {
    data: {
        car: string;
        email: string;
        phoneNumber: string;
        image: {
            alt: string;
            src: string;
        };
    };
}

const ReservedCar: React.FC<Props> = ({
                                          data: {
                                              car,
                                              email,
                                              phoneNumber,
                                              image: {alt, src},
                                          },
                                      }): JSX.Element => {
    return (
        <Background>
            <Container>
                <CarHeading>your car is reserved!</CarHeading>
                <Content>
                    <CarPicture>
                        <Picture alt={alt} src={src} width="100%" aspectRatio="3:2"/>
                    </CarPicture>
                    <Information>
                        <CarTitle>{car}</CarTitle>
                        <Steps>
                            <Step>
                                <Check icon={Icons.CHECKMARK_SMALL}/>
                                <Body.Regular>
                                    The email was sent to <Bold>{email}</Bold>.
                                </Body.Regular>
                            </Step>
                            <Step>
                                <Check icon={Icons.CHECKMARK_SMALL}/>
                                <Body.Regular>
                                    A Vroom representative will reach out to your phone number{' '}
                                    <Bold>+{phoneNumber}</Bold> within the next 24 hours of a business
                                    day.{' '}
                                </Body.Regular>
                            </Step>
                            <Step>
                                <Check icon={Icons.CHECKMARK_SMALL}/>
                                <Body.Regular>
                                    <Schedule href="https://www.vroom.com/schedule" blank>
                                        Schedule a time
                                    </Schedule>{' '}
                                    to talk with the Vroom team.
                                </Body.Regular>
                            </Step>
                        </Steps>
                    </Information>
                </Content>
            </Container>
        </Background>
    );
};

export default ReservedCar;
