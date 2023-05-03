import React from 'react';

import { DirectDepositContainer, InputContainer } from './Styled.css';

import FormikInput from 'src/core/FormikInput';

const DirectDeposit = () => {
  return (
    <DirectDepositContainer>
      <InputContainer>
        <FormikInput
          id="routingNumber"
          name="routingNumber"
          label="Routing Number"
          placeholder="Routing Number"
          fluid={true}
          maxLength={9}
        />
      </InputContainer>
      <InputContainer>
        <FormikInput
          id="bankAccountNumber"
          name="bankAccountNumber"
          label="Bank Account Number"
          placeholder="Bank Account Number"
          fluid={true}
          maxLength={17}
        />
      </InputContainer>
    </DirectDepositContainer>
  );
};

export default DirectDeposit;
