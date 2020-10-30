import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

const InputContainer = styled.div`
  padding-bottom: 20px;
`;

const InputLabel = styled.label`
  display: flex;
  letter-spacing: 0.35px;
  margin-bottom: 5px;
  font-size: 13px;
  line-height: 13px;
  font-family: Calibre;
  color: #041022;
`;

const InputComponent = styled.input`
  outline: none;
  appearance: none;
  border: 1px solid #e0e0e0;
  font-size: 18px;
  line-height: 18px;
  border-radius: 0;
  display: flex;
  padding: 8px 10px;
  width: 280px;
  font-family: Calibre;
  color: #041022;
`;

export interface Props {
  viewModel: DirectDepositViewModel;
}

const PayOptionsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <>
      <InputContainer>
        <InputLabel>{viewModel.routingLabel}</InputLabel>
        <InputComponent />
      </InputContainer>
      <InputContainer>
        <InputLabel>{viewModel.bankAccountLabel}</InputLabel>
        <InputComponent />
      </InputContainer>
    </>
  );
};

export default PayOptionsView;
