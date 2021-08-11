import { observer } from 'mobx-react';
import React, { useCallback, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import styled from 'styled-components';

import PlaidButtonViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import { PlaidData } from 'src/interfaces.d';

const PlaidButtonContainer = styled('div')(() => ({
  width: '100%',
}));

const PlaidButton = styled(Button.Primary)`
  display: flex;
  justify-content: center;
  margin: 15px 0;
  padding: 13px 20px;
  white-space: normal;
  width: 50%;

  @media (max-width: 420px) {
    width: 100%;
    justify-content: center;
  }
`;

export interface Props {
  viewModel: PlaidButtonViewModel;
  token: string;
  tokenIsLocal: boolean;
  plaidSuccess(
    mutationInput: PlaidData,
    onPlaidSubmitting: (value: boolean) => void
  ): void;
  plaidExit(): void;
  priceId: string;
}

const PlaidButtonView: React.FC<Props> = ({
  viewModel,
  token,
  tokenIsLocal,
  plaidSuccess,
  plaidExit,
  priceId,
}) => {
  let config;
  const onSuccess = useCallback(
    (_token, metaData): void => {
      const email = viewModel.getEmail();
      viewModel.onPlaidSubmitting(true);
      const onPlaidSubmitting = viewModel.onPlaidSubmitting;
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
        Email: email,
      };

      plaidSuccess(mutationInput, onPlaidSubmitting);
    },
    [viewModel, priceId, plaidSuccess]
  );

  const onExit = useCallback(
    (error, metadata): void => {
      if (error && token.length) console.log(`Plaid onExit error: ${error}`);
      if (
        metadata &&
        metadata.status === 'institution_not_found' &&
        viewModel.getInstitutionSearched()
      ) {
        viewModel.setInstitutionFound(false);
      }

      plaidExit();
      viewModel.onPlaidSubmitting(false);
    },
    [viewModel, token]
  );

  const onEvent = useCallback(
    (event): void => {
      if (event === 'SEARCH_INSTITUTION') {
        viewModel.setInstitutionSearched(true);
      }
    },
    [viewModel]
  );

  if (tokenIsLocal) {
    config = {
      token,
      receivedRedirectUri: window.location.href,
      onSuccess,
      onExit,
      onEvent,
    };
  } else {
    config = {
      token,
      onSuccess,
      onExit,
      onEvent,
    };
  }

  const { open, ready } = usePlaidLink(config);
  const tokenIsUndefined = token.length === 0;
  const isSubmitting = viewModel.getPlaidSubmitting();

  const disableButton = (!ready && tokenIsUndefined) || isSubmitting;

  const handlePlaidButtonClick = (): void => {
    viewModel.onPlaidSubmitting(true);
    open();
  };

  useEffect(() => {
    if (ready && tokenIsLocal) {
      open();
    }
  }, [ready, tokenIsLocal]);

  return (
    <PlaidButtonContainer>
      <PlaidButton onClick={handlePlaidButtonClick} disabled={disableButton}>
        {viewModel.buttonStartCopy}
      </PlaidButton>
    </PlaidButtonContainer>
  );
};

export default observer(PlaidButtonView);
