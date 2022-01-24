import React from 'react';
import styled from 'styled-components';

import { lettersAndNumbersOnly } from '../../../formatting';
import StateInput from '../../../forminputs/AddressInput/StateInput';
import LicenseInput from '../../../forminputs/LicenseInput';
import useForm from '../../../useForm';
import { buttonText, dataQa, genericLPError } from './language';

import { Button } from 'src/core/Button';

interface Props {
  router: any;
  analyticsHandler: any;
}

const LicenseStateInput: React.FC<Props> = ({ router, analyticsHandler }) => {
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
      handleLicenseStateSubmit();
    }
  };

  const handleLicenseStateSubmit = (): void => {
    const lpForPath = `${state.value}-${lettersAndNumbersOnly(
      licensePlate.value
    )}`;

    const label = 'License Plate';
    const category = 'Sell';

    analyticsHandler.trackLicenseToVin(label, category);

    if (!licensePlate.error) {
      const appraisalPath = `/`;
      router.push({
        pathname: appraisalPath,
        query: { vehicle: lpForPath },
      });
    } else {
      licensePlate.onChange({
        ...licensePlate,
        error: true,
        errorMessage: genericLPError,
      });
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
      <SubmitButton
        tabIndex={0}
        onKeyPress={handleOnKeyPressEnter}
        onClick={handleLicenseStateSubmit}
        disabled={!isFormValid}
        data-qa={dataQa}
      >
        {buttonText}
      </SubmitButton>
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

const SubmitButton = styled(({ ...restProps }) => (
  <Button.Primary {...restProps} />
))`
  width: 100%;
`;

export default LicenseStateInput;
