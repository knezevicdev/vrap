import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useForm from '@app/components/Form/useForm';
import VinFormInput from '@app/components/Form/Inputs/VinFormInput';
import PrimaryButton from '@app/components/Button/PrimaryButton';
import { PATHS, getThemedPath } from '@app/constants/routes';
import { buttonText, dataQa } from './language';
import { trackLicenseToVin } from '@app/lib/analytics/analytics/appraisal';

const VinInput = ({ history, location, theme, buttonColor }) => {
  const form = useForm({
    defaultValues: {
      vin: ''
    }
  });

  const {
    fields: { vin },
    isFormValid
  } = form;

  const trackVinClicked = () => {
    const { pathname } = location;
    const vinForPath = vin.value;
    let appraisalPath;

    switch (pathname) {
      case PATHS.checkoutTradeAppraisal.prefix:
        appraisalPath = PATHS.checkoutTradeAppraisal.withParams({
          vin: vinForPath
        });
        break;
      case PATHS.trade.prefix:
        appraisalPath = PATHS.tradeAppraisal.withParams({
          vin: vinForPath
        });
        break;
      default:
        appraisalPath = getThemedPath(
          PATHS.sellAppraisal.withParams({
            vin: vinForPath
          }),
          theme
        );
        break;
    }
    const label = 'Vin';
    let category = '';
    switch (pathname) {
      case PATHS.dealCongratulations.prefix:
        category = 'Ecommerce';
        break;
      case PATHS.checkoutTradeAppraisal.prefix:
        category = 'Trade';
        break;
      default:
        category = 'sell';
        break;
    }

    trackLicenseToVin(label, category);

    history.push(appraisalPath);
  };

  const handleOnKeyPressEnter = e => {
    if (e.key === 'Enter' && isFormValid) {
      trackVinClicked();
    }
  };

  return (
    <Container>
      <Vin field={vin} onKeyPressEnter={handleOnKeyPressEnter} />
      <Button
        tabIndex={0}
        onKeyPress={handleOnKeyPressEnter}
        disabled={!isFormValid}
        onClick={trackVinClicked}
        buttonColor={buttonColor}
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

VinInput.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  theme: PropTypes.string,
  buttonColor: PropTypes.string
};

export default VinInput;
