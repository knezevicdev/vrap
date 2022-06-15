import { Button } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { lettersAndNumbersOnly } from '../../../formatting';
import StateInput from '../../../forminputs/AddressInput/StateInput';
import LicenseInput from '../../../forminputs/LicenseInput';
import useForm from '../../../useForm';
import { buttonText, dataQa, genericLPError } from './language';

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
      const appraisalPath = `/sell/vehicleInformation`;
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
  width: 70%;
`;

const States = styled(StateInput)`
  width: 90px;

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
