import { Button } from '@vroom-web/ui-lib';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { useAppStore } from '../../../../../../context';
import AnalyticsHandler from '../../../../../../integrations/AnalyticsHandler';
import VinFormInput from '../../../forminputs/VinFormInput';
import useForm from '../../../useForm';

const VinInput: React.FC = () => {
  const router = useRouter();
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

  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);

  const trackVinClicked = useCallback(() => {
    const label = 'Vin';
    analyticsHandler.trackLicenseToVin(label, store.appraisal.eventCategory);
  }, [analyticsHandler, store.appraisal.eventCategory]);

  const handleOnKeyPressEnter = (e: any): void => {
    if (e.key === 'Enter' && isFormValid) {
      trackVinClicked();
    }
  };

  const vinSubmit = (): void => {
    const vinForPath = vin.value;
    trackVinClicked();

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
        data-qa="Submit"
      >
        WHAT&apos;S MY CAR WORTH?
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
