import { isErrorResponse } from '@vroom-web/networking';
import React, { useCallback, useState } from 'react';

import { submitPaymentOption } from '../../../../../../options/store';
import useVerificationStore from '../../../../../store/store';
import { SectionTitle } from '../../../../../Styled.css';
import DirectDeposit from './DirectDeposit/DirectDeposit';
import useDirectDepositForm from './DirectDeposit/useDirectDepositForm';
import PaymentAddressSelector from './PaymentAddressSelector/PaymentAddressSelector';
import usePaymentAddressForm from './PaymentAddressSelector/usePaymentAddressForm';
import PaymentOptions from './PaymentOptions';
import PlaidButton from './PlaidButton';
import { Preview, PreviewSubtitle } from './Style.css';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PlaidData } from 'src/interfaces.d';
import { postPlaidPayment } from 'src/networking/request';

interface Props {
  preview?: boolean;
  onComplete(): void;
}

const PaymentInformation = ({ preview, onComplete }: Props) => {
  const [selectedPayment, setSelectedPayment] = useState('DirectDeposit');
  const [institutionFound, setInstitutionFound] = useState(true);
  const [plaidSubmitting, setPlaidSubmitting] = useState(false);
  const refetchPlaidToken = useVerificationStore(
    (store) => store.refetchPlaidToken
  );
  const paymentAddressForm = usePaymentAddressForm();
  const directDepositForm = useDirectDepositForm();
  const setPaymentSubmittedType = useVerificationStore(
    (store) => store.setPaymentSubmittedType
  );

  const heading = (
    <Preview>
      <SectionTitle>Payment Method</SectionTitle>
      <PreviewSubtitle>How would you like to get paid?</PreviewSubtitle>
    </Preview>
  );

  const plaidSuccess = useCallback(
    async (mutationInput: PlaidData): Promise<void> => {
      const analyticsHandler = new AnalyticsHandler();

      try {
        const plaidPaymentRes = await postPlaidPayment(mutationInput);

        if (isErrorResponse(plaidPaymentRes)) {
          setPlaidSubmitting(false);
          console.log(JSON.stringify(plaidPaymentRes));
          throw plaidPaymentRes;
        }

        analyticsHandler.trackPaymentOptionsSubmitted('Plaid ACH');
        analyticsHandler.trackPlaidACHSelected();
        localStorage.removeItem('linkToken');
        localStorage.removeItem('priceId');
        setPaymentSubmittedType('Direct Deposit with PLAID');
        onComplete();
      } catch (err) {
        setPlaidSubmitting(false);
        console.log(JSON.stringify(err));
      }
    },
    [onComplete, setPaymentSubmittedType]
  );

  const plaidExit = useCallback(() => {
    localStorage.removeItem('linkToken');

    refetchPlaidToken();
  }, [refetchPlaidToken]);

  const getMailingAddress = useCallback(() => {
    const paymentAddressFormValues = paymentAddressForm.getValues();

    if (paymentAddressFormValues.sameAsPrimaryOwner === 'Yes') {
      const verificationState = useVerificationStore.getState();
      return {
        address_1: verificationState.firstOwnerAddress,
        state: verificationState.firstOwnerState,
        zipcode: verificationState.firstOwnerZip,
        city: verificationState.firstOwnerCity,
        address_2: verificationState.firstOwnerApt || '',
      };
    }

    return {
      address_1: paymentAddressFormValues.address,
      state: paymentAddressFormValues.state,
      zipcode: paymentAddressFormValues.zip,
      city: paymentAddressFormValues.city,
      address_2: paymentAddressFormValues.apt || '',
    };
  }, [paymentAddressForm]);

  const onPaymentSubmit = useCallback(() => {
    const analyticsHandler = new AnalyticsHandler();
    let submittedType;

    const mailingAddress = getMailingAddress();
    const directDepositValues = directDepositForm.getValues();

    submitPaymentOption(
      {
        paymentOption:
          selectedPayment === 'DirectDeposit'
            ? 'Direct Deposit'
            : 'Check by Mail',
        routingNumber: directDepositValues.routingNumber,
        bankAccountNumber: directDepositValues.bankAccountNumber,
        isPrimaryAddress: paymentAddressForm.getValues().sameAsPrimaryOwner,
        address: mailingAddress.address_1,
        apartment: mailingAddress.address_2,
        city: mailingAddress.city,
        state: mailingAddress.state,
        zipcode: mailingAddress.zipcode,
      },
      useVerificationStore.getState().priceId,
      mailingAddress
    );

    if (selectedPayment === 'DirectDeposit') {
      submittedType = 'Manual ACH';
      analyticsHandler.trackManualACHSelected();
    } else {
      submittedType = 'Check';
      analyticsHandler.trackCheckSelected();
    }

    analyticsHandler.trackPaymentOptionsSubmitted(submittedType);
    setPaymentSubmittedType(
      selectedPayment === 'DirectDeposit' ? 'Direct Deposit' : 'Check by Mail'
    );
    onComplete();
  }, [
    directDepositForm,
    getMailingAddress,
    onComplete,
    paymentAddressForm,
    selectedPayment,
    setPaymentSubmittedType,
  ]);

  if (preview) return heading;
  return (
    <div>
      {heading}
      <PaymentOptions
        selectedPayment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
      />
      {selectedPayment === 'CheckbyMail' && (
        <PaymentAddressSelector
          form={paymentAddressForm}
          onSubmit={onPaymentSubmit}
        />
      )}
      {selectedPayment === 'DirectDeposit' && (
        <PlaidButton
          plaidExit={plaidExit}
          plaidSubmitting={plaidSubmitting}
          setPlaidSubmitting={setPlaidSubmitting}
          plaidSuccess={plaidSuccess}
          setInstitutionFound={setInstitutionFound}
        />
      )}
      {!institutionFound && selectedPayment === 'DirectDeposit' && (
        <DirectDeposit form={directDepositForm} onSubmit={onPaymentSubmit} />
      )}
    </div>
  );
};

export default PaymentInformation;
