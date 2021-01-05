import {
  addStyleForMobile,
  addStyleForTablet,
  Heading,
  Icon,
  Icons,
  Link,
  ThemeProps,
} from '@vroom-web/temp-ui-alias-for-checkout';
import React from 'react';
import styled from 'styled-components';

import AnalyticsHandler, {
  TrackContactModule,
} from 'src/integrations/congratulations/CongratsAnalyticsHandler';
const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;
  margin-bottom: auto;
  background: ${primaryWhite};

  ${addStyleForMobile(`
      padding: 32px;
  `)}
`;

const Action = styled.div`
  display: flex;
  align-items: center;
`;

const Actions = styled.div`
  display: flex;
  margin-top: 32px;
  ${addStyleForMobile(`
        flex-direction: column;
        align-items: center;

        ${Action}:not(:last-child) {
            margin-bottom: 32px;
        }
   `)}
`;

const Divider = styled.div`
  ${addStyleForMobile(`
        display: none;
   `)}
  min-width: 1px;
  max-width: 1px;
  min-height: 40px;
  max-height: 40px;
  margin: 0 32px;
  background: ${grayThree};

  ${addStyleForTablet(`
      margin: 0 16px;
  `)}
`;

const BrandIcon = styled(Icon)`
  fill: ${primaryBrand};
  margin-right: 8px;
`;

const CustomLink = styled(Link)`
  font-weight: 600 !important;
  text-decoration: none !important;
  letter-spacing: 1.75px !important;
`;
export interface QuestionProps {
  analyticsHandler?: AnalyticsHandler;
  phone: {
    href: string;
    label: string;
  };
}

const Questions: React.FC<QuestionProps> = ({
  analyticsHandler,
  phone,
}): JSX.Element => {
  const handleLinkEvents = (
    eventName: TrackContactModule,
    url: string
  ) => () => {
    analyticsHandler?.trackContactModule(eventName);
    window.open(url, '_blank');
  };

  return (
    <Container>
      <Heading.Three>questions?</Heading.Three>
      <Actions>
        <Action>
          <BrandIcon icon={Icons.QUESTION} />
          <CustomLink
            onClick={handleLinkEvents(
              TrackContactModule.helpCenter,
              'https://vroom.zendesk.com/hc/en-us'
            )}
            href="#"
          >
            VISIT OUR HELP CENTER
          </CustomLink>
        </Action>
        <Divider />
        <Action>
          <BrandIcon icon={Icons.ENVELOPE} />
          <CustomLink
            onClick={handleLinkEvents(TrackContactModule.contactUs, '/contact')}
            href="#"
          >
            SEND A MESSAGE
          </CustomLink>
        </Action>
        <Divider />
        <Action>
          <BrandIcon icon={Icons.PHONE} />
          <CustomLink
            onClick={handleLinkEvents(
              TrackContactModule.phone,
              `tel:${phone.href}`
            )}
            href="#"
          >
            {phone.label}
          </CustomLink>
        </Action>
      </Actions>
    </Container>
  );
};

export default Questions;
