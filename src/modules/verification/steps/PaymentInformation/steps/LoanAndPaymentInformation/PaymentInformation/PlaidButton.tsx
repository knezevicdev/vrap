import React, { useCallback, useMemo, useRef } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { shallow } from 'zustand/shallow';

import { Icons } from '../../../../../../../core/Icon';
import useVerificationStore from '../../../../../store/store';
import { LockText, StyledIcon, StyledPlaidButton } from './Style.css';

import { PlaidData } from 'src/interfaces.d';

interface Props {
  plaidSuccess(mutationInput: PlaidData): void;
  plaidExit(): void;
  setInstitutionFound(value: boolean): void;
  setPlaidSubmitting(value: boolean): void;
  plaidSubmitting: boolean;
}

const PlaidButton = ({
  plaidSuccess,
  plaidExit,
  setInstitutionFound,
  plaidSubmitting,
  setPlaidSubmitting,
}: Props) => {
  const { verificationEmail, priceId, plaidToken, plaidTokenIsLocal } =
    useVerificationStore(
      ({ verificationEmail, priceId, plaidToken, plaidTokenIsLocal }) => ({
        verificationEmail,
        priceId,
        plaidToken,
        plaidTokenIsLocal,
      }),
      shallow
    );
  const insitutionSearched = useRef(false);

  const onSuccess = useCallback(
    (_token, metaData): void => {
      setPlaidSubmitting(true);
      const mutationInput = {
        Account: {
          Id: metaData.account.id,
          Name: metaData.account.name,
          Type: metaData.account.type,
          Subtype: metaData.account.subtype,
          Mask: metaData.account.mask,
        },
        Institution: {
          Id: metaData.institution.institution_id,
          Name: metaData.institution.name,
        },
        PublicToken: metaData.public_token,
        Source: 'acquisitions',
        ReferenceId: priceId,
        Email: verificationEmail,
      };
      plaidSuccess(mutationInput);
    },
    [setPlaidSubmitting, priceId, verificationEmail, plaidSuccess]
  );

  const onExit = useCallback(
    (error, metadata): void => {
      if (error && plaidToken.length)
        console.log(`Plaid onExit error: ${error}`);
      if (
        metadata &&
        metadata.status === 'institution_not_found' &&
        insitutionSearched.current
      ) {
        setInstitutionFound(false);
      }

      plaidExit();
      setPlaidSubmitting(false);
    },
    [plaidExit, plaidToken.length, setInstitutionFound, setPlaidSubmitting]
  );

  const onEvent = useCallback((event): void => {
    if (event === 'SEARCH_INSTITUTION') {
      insitutionSearched.current = true;
    }
  }, []);

  const config = useMemo(() => {
    if (plaidTokenIsLocal) {
      return {
        token: plaidToken,
        receivedRedirectUri: window.location.href,
        onSuccess,
        onExit,
        onEvent,
      };
    }

    return {
      token: plaidToken,
      onSuccess,
      onExit,
      onEvent,
    };
  }, [plaidTokenIsLocal, onEvent, onExit, onSuccess, plaidToken]);

  const { open, ready } = usePlaidLink(config);

  const tokenIsUndefined = plaidToken.length === 0;
  const disableButton = (!ready && tokenIsUndefined) || plaidSubmitting;

  return (
    <>
      <StyledPlaidButton
        disabled={disableButton}
        onClick={() => {
          setPlaidSubmitting(true);
          open();
        }}
      >
        Start direct deposit
      </StyledPlaidButton>
      <LockText>
        <StyledIcon icon={Icons.LOCK} /> Your information will be secure and
        encrypted
      </LockText>
    </>
  );
};

export default PlaidButton;
