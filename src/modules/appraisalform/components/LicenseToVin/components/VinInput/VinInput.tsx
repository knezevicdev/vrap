import React from 'react';
import styled from 'styled-components';

import PrimaryButton from '../../../Button/PrimaryButton';
import useForm from '../../../forminputs/useForm';
import VinFormInput from '../../../forminputs/VinFormInput';
import { buttonText, dataQa } from './language';
import ViewModel from './ViewModel';

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
      const { pathname } = window.location;
      const vinForPath = vin.value;
      viewModel.trackVinClicked(pathname, vinForPath);
    }
  };

  return (
    <Container>
      <Vin field={vin} onKeyPressEnter={handleOnKeyPressEnter} />
      <Button
        tabIndex={0}
        onKeyPress={handleOnKeyPressEnter}
        disabled={!isFormValid}
        onClick={viewModel.trackVinClicked}
        // buttonColor={buttonColor}
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

const Vin = styled(VinFormInput)`
  margin-bottom: 25px;
`;

const Button = styled(PrimaryButton)`
  width: 100%;
`;

export default VinInput;
