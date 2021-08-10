import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import FormikInput from 'src/core/FormikInput';

const DirectDepositContainer = styled('div')(() => ({
  width: '100%',
}));

const InputContainer = styled.div`
  width: 100%;
  label {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
  }
  input {
    border: 1px solid #999da3;
    height: 48px;
  }
`;

export interface Props {
  viewModel: DirectDepositViewModel;
}

const DirectDepositView: React.FC<Props> = ({ viewModel }) => {
  return (
    <DirectDepositContainer>
      <InputContainer>
        <FormikInput
          id="routingNumber"
          name={'routingNumber'}
          className="fs-mask"
          label={viewModel.routingLabel}
          placeholder={viewModel.routingLabel}
          fluid={true}
          maxLength={9}
        />
      </InputContainer>
      <InputContainer>
        <FormikInput
          id="bankAccountNumber"
          name={'bankAccountNumber'}
          className="fs-mask"
          label={viewModel.bankAccountLabel}
          placeholder={viewModel.bankAccountLabel}
          fluid={true}
          maxLength={17}
        />
      </InputContainer>
    </DirectDepositContainer>
  );
};

export default DirectDepositView;
