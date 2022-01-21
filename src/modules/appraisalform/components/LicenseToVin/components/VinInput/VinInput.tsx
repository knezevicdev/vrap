import React from 'react';
import styled from 'styled-components';

import useForm from '../../../forminputs/useForm';
import VinFormInput from '../../../forminputs/VinFormInput';
import { buttonText, dataQa } from './language';
import ViewModel from './ViewModel';

import { Button } from 'src/core/Button';

interface Props {
  viewModel: ViewModel;
}

//props
//history, location, theme, buttonColor

const VinInput: React.FC<Props> = ({ viewModel }) => {
  const form = useForm({
    defaultValues: {
      vin: '',
    },
  });

  const {
    fields: { vin },
    isFormValid,
  } = form;

  const handleOnKeyPressEnter = (e: any): void => {
    if (e.key === 'Enter' && isFormValid) {
      const vinForPath = vin.value;
      viewModel.trackVinClicked(vinForPath);
    }
  };

  return (
    <Container>
      <Vin field={vin} onKeyPressEnter={handleOnKeyPressEnter} />
      <SubmitButton
        tabIndex={0}
        onKeyPress={handleOnKeyPressEnter}
        disabled={!isFormValid}
        onClick={viewModel.trackVinClicked}
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

const Vin = styled(VinFormInput)`
  margin-bottom: 25px;
`;

const SubmitButton = styled(({ ...restProps }) => (
  <Button.Primary {...restProps} />
))`
  width: 100%;
`;

export default VinInput;
