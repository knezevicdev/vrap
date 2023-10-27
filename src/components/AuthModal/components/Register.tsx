import { isErrorResponse } from '@vroom-web/networking';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { displayPhoneNumber } from '../../../utils';
import AuthManager from '../../../utils/AuthManager';
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
  ModalTitle,
  PrimaryButton,
  SecondaryButton,
  SocialIcon,
  TwoColumnLayout,
} from '../Style.css';
import redirectToThirdParty from '../utils/redirectToThirdParty';
import registrationResolver from '../utils/registrationResolver';
import trackRegistrationAndSubmitWebLead from '../utils/trackRegistrationAndSubmitWebLead';
import Input from './Input';

export interface RegistrationData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface Props {
  onLogin: () => void;
  onSuccess: () => void;
  initialEmail: string;
  redirectUrl?: string;
  initialRegistrationData?: Partial<RegistrationData>;
  enable3rdPartyLogin: boolean;
  lockEmail: boolean;
}

const Register = ({
  onLogin,
  onSuccess,
  initialEmail,
  redirectUrl,
  initialRegistrationData,
  enable3rdPartyLogin,
  lockEmail,
}: Props) => {
  const [errorMessage, setErrorMessage] = useState('');

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: initialEmail,
      password: '',
      passwordConfirmation: '',
    },
    resolver: registrationResolver,
  });

  useEffect(() => {
    if (initialRegistrationData?.firstName)
      setValue('firstName', initialRegistrationData.firstName);
    if (initialRegistrationData?.lastName)
      setValue('lastName', initialRegistrationData.lastName);
    if (initialRegistrationData?.phoneNumber)
      setValue('phoneNumber', initialRegistrationData.phoneNumber);
  }, [initialRegistrationData, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    setErrorMessage('');
    const response = await AuthManager.registerUser(
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      data.phoneNumber
    );

    if (isErrorResponse(response)) {
      if (response.error.message.includes('status code 409')) {
        setErrorMessage('User already exists, please sign in again.');
      } else {
        setErrorMessage('Something went wrong, please try again.');
      }
      return;
    }

    trackRegistrationAndSubmitWebLead(
      data.firstName,
      data.lastName,
      data.email,
      data.phoneNumber,
      response.data.data.externalUserID
    );
    onSuccess();
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <ModalTitle>Create an account</ModalTitle>
        {errorMessage && (
          <ErrorWrapper>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </ErrorWrapper>
        )}
        <TwoColumnLayout>
          <Input
            placeholder="First Name"
            label="First name"
            id="firstName"
            control={control}
          />
          <Input
            placeholder="Last Name"
            label="Last name"
            id="lastName"
            control={control}
          />
        </TwoColumnLayout>
        <Input
          placeholder="Email"
          label="Email address"
          type="email"
          id="email"
          control={control}
          disabled={lockEmail}
        />
        <Input
          placeholder="(  ) ___-____"
          label="Phone number"
          id="phoneNumber"
          control={control}
          valueFormatter={displayPhoneNumber}
        />
        <Input
          placeholder="Password (min 8 characters)"
          label="Password"
          type="password"
          id="password"
          control={control}
        />
        <Input
          placeholder="Confirm Password"
          label="Confirm Password"
          type="password"
          id="passwordConfirmation"
          control={control}
        />
        <PrimaryButton disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Create account'}
        </PrimaryButton>
      </Form>
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
              <LegalListItem>
                Certify that I have read and agreed to Vroom&apos;s&nbsp;
                <Link
                  href="/legal/terms-of-use"
                  target="_blank"
                  className="sc-fWCJzd dpogyX View__CustomLink-sc-1t039fp-3 jFLFmB"
                >
                  Terms of Use
                </Link>
                ,&nbsp;
                <Link
                  href="/legal/financial-privacy-policy"
                  target="_blank"
                  className="sc-fWCJzd dpogyX View__CustomLink-sc-1t039fp-3 jFLFmB"
                >
                  Financial Privacy Policy
                </Link>
                ,&nbsp;
                <Link
                  href="/legal/privacy-policy"
                  target="_blank"
                  className="sc-fWCJzd dpogyX View__CustomLink-sc-1t039fp-3 jFLFmB"
                >
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
              <LegalListItem>
                Certify that I have read and agreed to our&nbsp;
                <Link
                  href="/legal/e-sign"
                  target="_blank"
                  className="sc-fWCJzd dpogyX View__CustomLink-sc-1t039fp-3 jFLFmB"
                >
                  E-SIGN Consent
                </Link>
                , which enables all transactions and disclosure delivery to
                occur electronically
              </LegalListItem>
              <LegalListItem>
                Agree to receive texts or calls from Vroom and its third-party
                customer support team regarding my interest in buying or selling
                a vehicle and for marketing/sales, informational or servicing
                purposes. You may opt out by responding “STOP” to any text
                message or by updating the information in my account. Message
                and data rates may apply
              </LegalListItem>
              <LegalListItem>
                Want to receive communications about Vroom news and offers
              </LegalListItem>
            </LegalList>
          </LegalContent>
        </>
      )}
      <FooterContent>
        Already have a Vroom account?{' '}
        <ButtonLink onClick={onLogin} disabled={isSubmitting}>
          Log in.
        </ButtonLink>
      </FooterContent>
    </>
  );
};

export default Register;
