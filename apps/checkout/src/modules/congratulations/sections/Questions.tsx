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

import { TrackContactModule } from 'src/integrations/congratulations/CongratsAnalyticsHandler';
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
  trackQuestions?: (event: TrackContactModule) => () => void;
  phone: {
    href: string;
    name: string;
  };
}

const Questions: React.FC<QuestionProps> = ({
  trackQuestions,
  phone,
}): JSX.Element => {
  return (
    <Container>
      <Heading.Three>questions?</Heading.Three>
      <Actions>
        <Action>
          <BrandIcon icon={Icons.QUESTION} />
          <CustomLink
            onClick={
              trackQuestions && trackQuestions(TrackContactModule.helpCenter)
            }
            href="https://vroom.zendesk.com/hc/en-us"
            blank
          >
            VISIT OUR HELP CENTER
          </CustomLink>
        </Action>
        <Divider />
        <Action>
          <BrandIcon icon={Icons.ENVELOPE} />
          <CustomLink
            onClick={
              trackQuestions && trackQuestions(TrackContactModule.contactUs)
            }
            href="/contact"
            blank
          >
            SEND A MESSAGE
          </CustomLink>
        </Action>
        <Divider />
        <Action>
          <BrandIcon icon={Icons.PHONE} />
          <CustomLink
            onClick={trackQuestions && trackQuestions(TrackContactModule.phone)}
            href={`tel:${phone.href}`}
          >
            {phone.name}
          </CustomLink>
        </Action>
      </Actions>
    </Container>
  );
};

export default Questions;
