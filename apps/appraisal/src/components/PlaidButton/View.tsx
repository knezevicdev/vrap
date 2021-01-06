import React, { useCallback } from 'react';
import styled from 'styled-components';

import { usePlaidLink } from 'react-plaid-link';

import PlaidButtonViewModel from './ViewModel';

import { Button } from 'src/core/Button';

const PlaidButtonContainer = styled('div')(() => ({
  width: '100%',
}));

const PlaidButton = styled(Button.Primary)`
  margin: 15px 0 30px;
  max-width: 180px;
  white-space: normal;
  width: 100%;

  @media (max-width: 420px) {
    max-width: 100%;
  }
`;

export interface Props {
  viewModel: PlaidButtonViewModel;
  token: string;
}

const PlaidButtonView: React.FC<Props> = ({ viewModel, token }) => {
  const onSuccess = useCallback((token:string, metaData: any):void => {
    console.log('token', token);
    console.log('metaData', metaData);
  }, []);

  console.log('plaid component', token.token);
  const config = {
    token: token.token,
    onSuccess
  }

  const { open, ready, error } = usePlaidLink(config);

  return (
    <PlaidButtonContainer>
      <PlaidButton onClick={() => open()} disabled={!ready}>
          {viewModel.buttonCopy}
        </PlaidButton>
    </PlaidButtonContainer>
  );
};

export default PlaidButtonView;
