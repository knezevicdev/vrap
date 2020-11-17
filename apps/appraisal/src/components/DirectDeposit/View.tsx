import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import FormikInput from 'src/core/FormikInput';
import { Body } from 'src/core/Typography';

const DirectDepositContainer = styled('div')(() => ({
  width: '100%',
}));

const DirectDepositCopy = styled(Body.Regular)(() => ({
  display: 'flex',
  padding: '20px 0 15px',
}));

export interface Props {
  viewModel: DirectDepositViewModel;
}

const DirectDepositView: React.FC<Props> = ({ viewModel }) => {
  return (
    <DirectDepositContainer>
      <DirectDepositCopy>{viewModel.bankInfo}</DirectDepositCopy>
      <InputContainer>
        <FormikInput
          id="routingNumber"
          name={'routingNumber'}
          label={viewModel.routingLabel}
          placeholder={viewModel.routingLabel}
          fluid={true}
        />
      </InputContainer>
      <InputContainer>
        <FormikInput
          id="bankAccountNumber"
          name={'bankAccountNumber'}
          label={viewModel.bankAccountLabel}
          placeholder={viewModel.bankAccountLabel}
          fluid={true}
        />
      </InputContainer>
    </DirectDepositContainer>
  );
};

const InputContainer = styled.div`
  width: 50%;
`;

export default DirectDepositView;