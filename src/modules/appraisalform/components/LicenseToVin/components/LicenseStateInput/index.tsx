import React from 'react';
import styled from 'styled-components';

import StateInput from '../../../forminputs/AddressInput/StateInput';
import LicenseInput from '../../../forminputs/LicenseInput';

interface Props {
  licenseForm: any;
  onKeyPressEnter: () => void;
}

const LicenseStateInput: React.FC<Props> = ({
  licenseForm,
  onKeyPressEnter,
}) => {
  const {
    fields: { licensePlate, state },
  } = licenseForm;

  return (
    <Container>
      <InputContainer>
        <LicenseInputContainer
          className={''}
          field={licensePlate}
          onKeyPressEnter={onKeyPressEnter}
        />
        <States
          className={''}
          field={state}
          onKeyPressEnter={onKeyPressEnter}
        />
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LicenseInputContainer = styled(LicenseInput)`
  width: 70%;
`;

const States = styled(StateInput)`
  width: 90px;

  & select {
    padding: 10px;
  }
`;

export default LicenseStateInput;
