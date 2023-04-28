import { Button } from '@vroom-web/ui-lib';
import { NextRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { useAppStore } from '../../../../../../context';
import VinFormInput from '../../../forminputs/VinFormInput';
import useForm from '../../../useForm';
import { buttonText, dataQa } from './language';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
  router: NextRouter;
}

const VinInput: React.FC<Props> = ({ viewModel, router }) => {
  const { store } = useAppStore();
  const appraisalPath = store.appraisal.appraisalPath;
  const form = useForm({
    defaultValues: {
      vin: '',
    },
    formKey: 'vinInputForm',
  });

  const {
    fields: { vin },
    isFormValid,
  } = form;

  const handleOnKeyPressEnter = (e: any): void => {
    if (e.key === 'Enter' && isFormValid) {
      viewModel.trackVinClicked();
    }
  };

  const vinSubmit = (): void => {
    const vinForPath = vin.value;
    viewModel.trackVinClicked();

    router
      .push({
        pathname: appraisalPath,
        query: { vehicle: vinForPath, form: router.query.form },
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Container>
      <Vin field={vin} onKeyPressEnter={handleOnKeyPressEnter} />
      <SubmitButton
        onKeyPress={handleOnKeyPressEnter}
        disabled={!isFormValid}
        onClick={vinSubmit}
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
