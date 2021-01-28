import {
  addStyleForMobile,
  addStyleForTablet,
  Body,
  Heading,
  Icon,
  Icons,
  Link,
  Picture,
  ThemeProps,
  Title,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import Trade from '../components/Trade';

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const grayFour = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.four;

const Background = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(${primaryBrand} 70%, ${grayFour} 30%);
`;

const Container = styled.div<{ hasTradeIn: boolean }>`
  display: flex;
  padding: 48px 0;
  width: ${(props): string => (props.hasTradeIn ? '84%' : '100%')};
  max-width: ${(props): string => (props.hasTradeIn ? '1088px' : '1312px')};
  margin: 64px;
  box-shadow: 0px 4px 24px 4px rgba(0, 0, 0, 0.1);
  background: ${primaryWhite};

  ${addStyleForTablet(`
    flex-direction: column;
    padding: 32px;
    margin: 32px 0;
    width: calc(100% - 128px);
  `)}

  ${addStyleForMobile(`
    flex-direction: column;
    padding: 16px 16px 32px 16px;
    margin: 16px 0 32px 0;
    width: calc(100% - 32px);
  `)}
`;

const Content = styled.div<{ hasTradeIn: boolean }>`
  display: flex;
  flex-direction: ${(props): string => (props.hasTradeIn ? 'row' : 'column')};
  align-items: center;

  ${addStyleForTablet(`
    flex-direction: column;
  `)}

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
  text-align: center;
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

const CarTitle = styled(Title.Two)<{ hasTradeIn: boolean }>`
  margin-top: 24px;
  margin-bottom: 16px;
  ${(props): string | false => !props.hasTradeIn && `text-align: center;`}
  ${addStyleForTablet(`
    text-align: center;
  `)}
  
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

const Schedule = styled(Link)`
  color: ${primaryBrand} !important;
`;

const Reserved = styled.div<{ hasTradeIn: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props): string => (props.hasTradeIn ? '100%' : '40%')};
  margin: 0 auto;
  ${addStyleForMobile(`
    width: 100%;
  `)}

  ${addStyleForTablet(`
    width: 100%;
  `)}
`;

const Divider = styled.div`
  background: ${grayThree};
  min-width: 1px;
  max-width: 1px;
  min-height: 100%;
  max-height: 100%;

  ${addStyleForTablet(`
    min-width: 100%;
    max-width: 100%;
    min-height: 1px;
    max-height: 1px;
    margin: 32px 0;
  `)}

  ${addStyleForMobile(`
    min-width: 100%;
    max-width: 100%;
    min-height: 1px;
    max-height: 1px;
    margin: 32px 0;
  `)}
`;

export interface ReservedCarProps {
  trackScheduleTime?: () => void;
  trackLicensePlateClick?: () => void;
  trackVinClick?: () => void;
  data: {
    car: string;
    email: string;
    phoneNumber: string;
    image: {
      alt: string;
      src: string;
    };
  };
  hasTradeIn: boolean;
}

const ReservedCar: React.FC<ReservedCarProps> = ({
  trackScheduleTime,
  data: {
    car,
    email,
    phoneNumber,
    image: { alt, src },
  },
  hasTradeIn,
  trackLicensePlateClick,
  trackVinClick,
}): JSX.Element => {
  return (
    <Background>
      <Container hasTradeIn={hasTradeIn}>
        <Reserved hasTradeIn={hasTradeIn}>
          <CarHeading>your car is reserved!</CarHeading>
          <Content hasTradeIn={hasTradeIn}>
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
              <CarTitle hasTradeIn={hasTradeIn}>{car}</CarTitle>
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
                    <Schedule href="/schedule" onClick={trackScheduleTime}>
                      Schedule a time
                    </Schedule>{' '}
                    to talk with the Vroom team.
                  </Body.Regular>
                </Step>
              </Steps>
            </Information>
          </Content>
        </Reserved>
        {!hasTradeIn && (
          <>
            <Divider />
            <Trade
              trackLicensePlateClick={trackLicensePlateClick}
              trackVinClick={trackVinClick}
            />
          </>
        )}
      </Container>
    </Background>
  );
};

export default ReservedCar;
