import { Body, Link, ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const primaryBrand = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.brand;

const CustomLink = styled(Link)`
  font-size: inherit;
  color: ${primaryBrand};
  text-decoration: none;
`;

const LegalCopy: FC = () => {
  return (
    <Container>
      <Body.Small>By clicking the “Join” button, I:</Body.Small>

      <Body.Small>
        Certify that I have read and agreed to our{' '}
        <CustomLink href="https://vroom.com/legal/e-sign" target="_blank">
          E-SIGN Consent
        </CustomLink>
        , which enables all transactions and disclosure delivery to occur
        electronically, and{' '}
        <CustomLink href="https://vroom.com/legal/terms-of-use" target="_blank">
          Terms of Use
        </CustomLink>
      </Body.Small>

      <Body.Small>
        Certify that I have received and read Vroom&apos;s{' '}
        <CustomLink
          href="https://vroom.com/legal/financial-privacy-policy"
          target="_blank"
        >
          Financial Privacy Policy
        </CustomLink>
        ; and
      </Body.Small>

      <Body.Small>
        Consent to receive autodialed calls and/or text messages from or on
        behalf of Vroom at the telephone number(s) I provide, including my
        wireless number, if applicable, regarding my interest in buying or
        selling a car and for other marketing purposes. Your consent is not
        required to purchase from Vroom.
      </Body.Small>
    </Container>
  );
};

export default LegalCopy;
