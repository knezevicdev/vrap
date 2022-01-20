import React from 'react';
import styled from 'styled-components';

import PrimaryButton from '../../../Button/PrimaryButton';
import StateInput from '../../../forminputs/AddressInput/StateInput';
import LicenseInput from '../../../forminputs/LicenseInput';
import useForm from '../../../forminputs/useForm';
import { buttonText, dataQa } from './language';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const LicenseStateInput: React.FC<Props> = ({ viewModel }) => {
  const form = useForm({
    defaultValues: {
      licensePlate: '',
      state: '',
    },
  });

  const {
    fields: { licensePlate, state },
    isFormValid,
  } = form;

  const handleOnKeyPressEnter = (e: any): void => {
    if (e.key === 'Enter' && isFormValid) {
      viewModel.handleLicenseStateSubmit(licensePlate, state);
    }
  };

  return (
    <Container>
      <InputContainer>
        <LicenseInputContainer
          className={''}
          field={licensePlate}
          onKeyPressEnter={handleOnKeyPressEnter}
        />
        <States
          className={''}
          field={state}
          onKeyPressEnter={handleOnKeyPressEnter}
        />
      </InputContainer>
      <Button
        tabIndex={0}
        onKeyPress={handleOnKeyPressEnter}
        onClick={viewModel.handleLicenseStateSubmit}
        disabled={!isFormValid}
        // buttonColor={buttonColor} //TODO: why is this not working suddenly?
        data-qa={dataQa}
      >
        {buttonText}
      </Button>
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
  margin-bottom: 25px;
`;

const LicenseInputContainer = styled(LicenseInput)`
  @media (min-width: 768px) {
    width: 70%;
  }
`;

const States = styled(StateInput)`
  @media (min-width: 768px) {
    width: 90px;
  }

  @media (min-width: 1024px) and (max-width: 1279px) {
    width: 160px;
  }

  & select {
    padding: 10px;
  }
`;

const Button = styled(PrimaryButton)`
  width: 100%;
`;

export default LicenseStateInput;
