import { isErrorResponse } from '@vroom-web/networking';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Spinner from '../../Spinner';
import {
  ButtonLink,
  Divider,
  ErrorMessage,
  ErrorWrapper,
  FooterContent,
  Form,
  LegalContent,
  LegalList,
  LegalListItem,
  Link,
  LinkSecondary,
  ModalTitle,
  PrimaryButton,
  SecondaryButton,
  SocialIcon,
} from '../Style.css';
import loginResolver from '../utils/loginResolver';
import loginUser from '../utils/loginUser';
import redirectToThirdParty from '../utils/redirectToThirdParty';
import trackLogin from '../utils/trackLogin';
import Input from './Input';

interface Props {
  onRegister: () => void;
  onSuccess: () => void;
  redirectUrl?: string;
}

const Login = ({ onRegister, onSuccess, redirectUrl }: Props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: loginResolver,
  });

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage('');
    const response = await loginUser(data.email, data.password);
    if (isErrorResponse(response)) {
      setErrorMessage(
        'The email address or password is invalid. Please try a different email address or password.'
      );
      return;
    }

    trackLogin(data.email, response.data.externalUserID);
    onSuccess();
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <ModalTitle>Welcome back</ModalTitle>
        {errorMessage && (
          <ErrorWrapper>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </ErrorWrapper>
        )}
        <Input
          placeholder="Email"
          label="Email address"
          type="email"
          id="email"
          control={control}
        />
        <Input
          placeholder="Password (min 8 characters)"
          label="Password"
          type="password"
          id="password"
          control={control}
        />
        <LinkSecondary href="/myaccount/forgot-password">
          Forgot Password?
        </LinkSecondary>
        <PrimaryButton disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Log In'}
        </PrimaryButton>
      </Form>
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
            ;&nbsp;and&nbsp;
            <Link href="/legal/privacy-policy" target="_blank">
              Privacy Policy
            </Link>
            .
          </LegalListItem>
          <LegalListItem className="View__LegalContentListItem-sc-1mn8xok-11 DrBQv">
            Want to receive communications about Vroom news and offers
          </LegalListItem>
        </LegalList>
      </LegalContent>
      <FooterContent>
        Don&apos;t have a Vroom account?{' '}
        <ButtonLink onClick={onRegister} disabled={isSubmitting}>
          Join.
        </ButtonLink>
      </FooterContent>
    </>
  );
};

export default Login;
