import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import FormikInput from 'src/core/FormikInput';

export interface Props {
  viewModel: DirectDepositViewModel;
}

const PayOptionsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <>
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
    </>
  );
};

const InputContainer = styled.div`
  width: 50%;
`;

export default PayOptionsView;
