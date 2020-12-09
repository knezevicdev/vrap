import React from 'react';
import styled from 'styled-components';
import Icon, { Icons } from 'vroom-ui/src/elements/Icon/Icon';
import { ThemeProps } from 'vroom-ui/src/foundation/themes/types';
import {
  addStyleForMobile,
  addStyleForTablet,
} from 'vroom-ui/src/foundation/themes/Vroom';
import { Heading, Link } from 'vroom-ui/src/foundation/Typography';

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const grayThree = (props: { theme: ThemeProps }): string =>
  props.theme.colors.gray.three;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px;

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
  phone: {
    href: string;
    label: string;
  };
}

const Questions: React.FC<QuestionProps> = ({ phone }): JSX.Element => {
  return (
    <Container>
      <Heading.Three>questions?</Heading.Three>
      <Actions>
        <Action>
          <BrandIcon icon={Icons.QUESTION} />
          <CustomLink href="https://vroom.zendesk.com/hc/en-us" blank>
            VISIT OUR HELP CENTER
          </CustomLink>
        </Action>
        <Divider />
        <Action>
          <BrandIcon icon={Icons.ENVELOPE} />
          <CustomLink href="https://www.vroom.com/contact" blank>
            SEND A MESSAGE
          </CustomLink>
        </Action>
        <Divider />
        <Action>
          <BrandIcon icon={Icons.PHONE} />
          <CustomLink href={`tel:${phone.href}`} blank>
            {phone.label}
          </CustomLink>
        </Action>
      </Actions>
    </Container>
  );
};

export default Questions;
