import React, { useCallback } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { usePlaidLink } from 'react-plaid-link';

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
  plaidSuccess (mutationInput: PlaidData): void;
}

const PlaidButtonView: React.FC<Props> = ({ viewModel, token, plaidSuccess }) => {
  const onSuccess = useCallback((_token: string, metaData: any): void => {
    const mutationInput = {
      account: {
        ...metaData.account
      },
      authenticated_user: true,
      institution: { ...metaData.institution },
      public_token: metaData.public_token
    };

    plaidSuccess(mutationInput);
  }, []);

  const config = {
    token,
    onSuccess
  }

  const tokenIsUndefined = token.length === 0;

  const { open, ready } = usePlaidLink(config);

  return (
    <PlaidButtonContainer>
      <PlaidButton onClick={() => open()} disabled={!ready && tokenIsUndefined}>
          {viewModel.buttonCopy}
          <ArrowForwardIcon />
        </PlaidButton>
    </PlaidButtonContainer>
  );
};

export default observer(PlaidButtonView);
