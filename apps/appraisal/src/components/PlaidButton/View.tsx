import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { observer } from 'mobx-react';
import React, { useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import styled from 'styled-components';

import PlaidButtonViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import { PlaidData } from 'src/interfaces.d';

const PlaidButtonContainer = styled('div')(() => ({
  width: '100%',
}));

const PlaidButton = styled(Button.Primary)`
  margin: 15px 0 30px;
  white-space: normal;
  width: auto;
  display: flex;
  padding: 13px 20px;

  @media (max-width: 420px) {
    width: 100%;
    justify-content: center;
  }
`;

export interface Props {
  viewModel: PlaidButtonViewModel;
  token: string;
  plaidSuccess(mutationInput: PlaidData, onPlaidSubmitting: any): void;
  priceId: string;
}

const PlaidButtonView: React.FC<Props> = ({
  viewModel,
  token,
  plaidSuccess,
  priceId,
}) => {
  const onSuccess = useCallback((_token: string, metaData: any): void => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onExit = useCallback((): void => {
    viewModel.onPlaidSubmitting(false);
  }, [viewModel]);

  const config = {
    token,
    onSuccess,
    onExit,
  };

  const tokenIsUndefined = token.length === 0;
  const isSubmitting = viewModel.getPlaidSubmitting();

  const { open, ready } = usePlaidLink(config);

  const disableButton = (!ready && tokenIsUndefined) || isSubmitting;

  const handlePlaidButtonClick = (): void => {
    viewModel.onPlaidSubmitting(true);
    open();
  };

  return (
    <PlaidButtonContainer>
      <PlaidButton onClick={handlePlaidButtonClick} disabled={disableButton}>
        {viewModel.buttonCopy}
        <ArrowForwardIcon />
      </PlaidButton>
    </PlaidButtonContainer>
  );
};

export default observer(PlaidButtonView);
