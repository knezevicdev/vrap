import {
  addStyleForMobile,
  Body,
  Heading,
  Icon,
  Icons,
  Picture,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import AnalyticsHandler from 'src/integrations/congratulations/CongratsAnalyticsHandler';
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
  width: 1082px;
  min-height: 416px;
  padding: 48px;
  margin: 64px;
  box-shadow: 0px 4px 24px 4px rgba(0, 0, 0, 0.1);
  background: ${primaryWhite};
  ${addStyleForMobile(`
        padding: 16px 16px 32px 16px;
        margin: 16px 16px 32px 16px;
   `)}
`;

const Content = styled.div`
  display: flex;
  ${addStyleForMobile(`
        flex-direction: column;
   `)}
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  ${addStyleForMobile(`
        margin-left: 0;
   `)}
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
        font-size: 36px;
        line-height: 40px;
        text-align: center;
   `)}
`;

const Step = styled.div`
  display: flex;
  align-items: center;
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
        font-size: 20px;
        margin-top: 16px;
        line-height: 24px;
        text-align: center;
   `)}
`;

const Check = styled(Icon)`
  margin-right: 8px;
`;

const Bold = styled.span`
  font-weight: 600;
`;

/*const Schedule = styled(Link)`
  color: ${primaryBrand} !important;
`;
*/
export interface ReservedCarProps {
  analyticsHandler: AnalyticsHandler;
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

const ReservedCar: React.FC<ReservedCarProps> = ({
  analyticsHandler,
  data: {
    car,
    email,
    phoneNumber,
    image: { alt, src },
  },
}): JSX.Element => {
  const handleScheduleTimeEvent = () => {
    analyticsHandler.trackScheduleTime();
    window.open('/schedule', '_blank');
  };

  return (
    <Background>
      <Container>
        <CarHeading>your car is reserved!</CarHeading>
        <Content>
          <CarPicture>
            <Picture
              alt={alt}
              src={src}
              width="100%"
              aspectRatio="3:2"
              objectFit="contain"
            />
          </CarPicture>
          <Information>
            <CarTitle>{car}</CarTitle>
            <Steps>
              <Step>
                <Check icon={Icons.ENVELOPE} />
                <Body.Regular>
                  The email was sent to <Bold>{email}</Bold>.
                </Body.Regular>
              </Step>
              <Step>
                <Check icon={Icons.PHONE} />
                <Body.Regular>
                  A Vroom representative will reach out to your phone number{' '}
                  <Bold>+{phoneNumber}</Bold> within the next 24 hours of a
                  business day.{' '}
                </Body.Regular>
              </Step>
              <Step>
                <Check icon={Icons.CALENDAR} />
                <Body.Regular>
                  {/* TODO: https://tdalabs.atlassian.net/browse/ECOMM-2947
                  <Schedule href="https://www.vroom.com/schedule" blank>
                    Schedule a time
                  </Schedule> */}
                  <a href="#" onClick={handleScheduleTimeEvent}>
                    Schedule a time
                  </a>{' '}
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
