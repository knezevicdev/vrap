import { Button } from '@vroom-web/ui-lib';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import AnalyticsHandler from '../../../../../../integrations/AnalyticsHandler';
import useAppraisalStore from '../../../../../../store/appraisalStore';
import VinFormInput from '../../../forminputs/VinFormInput';
import useForm from '../../../useForm';

const VinInput: React.FC = () => {
  const router = useRouter();
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
    analyticsHandler.trackLicenseToVin(
      label,
      useAppraisalStore.getState().eventCategory()
    );
  }, [analyticsHandler]);

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
        pathname: useAppraisalStore.getState().appraisalPath(),
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
