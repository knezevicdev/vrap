import { isErrorResponse } from '@vroom-web/networking';
import axios from 'axios';
import getConfig from 'next/config';
import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { useRecaptcha } from '../../../context/Recaptcha';
import Spinner from '../../Spinner';
import {
  Divider,
  FooterContent,
  Form,
  LegalContent,
  LegalList,
  LegalListItem,
  Link,
  ModalTitle,
  PrimaryButton,
  SecondaryButton,
  SocialIcon,
} from '../Style.css';
import checkAccount from '../utils/checkAccount';
import checkAccountResolver from '../utils/checkAccountResolver';
import redirectToThirdParty from '../utils/redirectToThirdParty';
import Input from './Input';

const { publicRuntimeConfig } = getConfig();

interface Props {
  onEmailProcessed: (email: string, hasAccount: boolean) => void;
  redirectUrl?: string;
  initialEmail?: string;
  enable3rdPartyLogin: boolean;
  lockEmail: boolean;
}

const Initial = ({
  onEmailProcessed,
  redirectUrl,
  initialEmail,
  enable3rdPartyLogin,
  lockEmail,
}: Props) => {
  const recaptcha = useRecaptcha();
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm({
    defaultValues: {
      email: initialEmail || '',
    },
    resolver: checkAccountResolver,
  });

  const onSubmit = handleSubmit(async (data) => {
    const token = await recaptcha.getToken();
    const response = await checkAccount(data.email, token);
    if (isErrorResponse(response)) {
      onEmailProcessed(data.email, false);
      return;
    }

    onEmailProcessed(data.email, response.data.exists);
  });

  const loginWithGoogleButton = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!publicRuntimeConfig.ENABLE_3PA_LOGIN) return;

    function handleCredentialResponse(response: {
      clientId: string;
      client_id: string;
      credential: string;
      select_by: string;
    }) {
      axios
        .post('/appraisal/api/3pa-login', {
          token: response.credential,
        })
        .then((response) => {
          console.log(response.data);
        });
    }

    google.accounts.id.initialize({
      client_id: publicRuntimeConfig.GOOGLE_3PA_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(loginWithGoogleButton.current, {
      theme: 'outline',
      size: 'large',
    });
    google.accounts.id.prompt();
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <ModalTitle>sign in or sign up</ModalTitle>
        <FooterContent>
          Enter your email to log in or create new account.
        </FooterContent>
        <Input
          placeholder="Email"
          label="Email address"
          type="email"
          id="email"
          control={control}
          disabled={lockEmail}
        />
        <PrimaryButton disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Continue'}
        </PrimaryButton>
      </Form>
      {publicRuntimeConfig.ENABLE_3PA_LOGIN && (
        <div ref={loginWithGoogleButton} style={{ marginTop: '16px' }}>
          continue with google
        </div>
      )}
      {enable3rdPartyLogin && (
        <>
          <Divider />
          <SecondaryButton
            disabled={isSubmitting}
            onClick={() => redirectToThirdParty(redirectUrl)}
          >
            Continue with
            <SocialIcon
              src="https://www.vroom.com/static-assets/icons/myaccount/apple.svg"
              alt="Apple"
            />
            or
            <SocialIcon
              src="https://www.vroom.com/static-assets/icons/myaccount/google.svg"
              alt="Google"
            />
          </SecondaryButton>
          <LegalContent>
            By clicking &quot;Continue with Apple or Google&quot; button, I:
            <LegalList>
              <LegalListItem className="View__LegalContentListItem-sc-1mn8xok-11 DrBQv">
                Certify that I have read and agreed to Vroom&apos;s&nbsp;
                <Link href="/legal/terms-of-use" target="_blank">
                  Terms of Use
                </Link>
                ,&nbsp;
                <Link href="/legal/financial-privacy-policy" target="_blank">
                  Financial Privacy Policy
                </Link>
                ,&nbsp;
                <Link href="/legal/privacy-policy" target="_blank">
                  Privacy Policy
                </Link>
                , and, if I am California resident, reviewed this&nbsp;
                <Link
                  href="/legal/privacy-policy#california-residents"
                  target="_blank"
                >
                  Notice of Collection
                </Link>
                .
              </LegalListItem>
              <LegalListItem className="View__LegalContentListItem-sc-1mn8xok-11 DrBQv">
                Want to receive communications about Vroom news and offers
              </LegalListItem>
            </LegalList>
          </LegalContent>
        </>
      )}
    </>
  );
};

export default Initial;
