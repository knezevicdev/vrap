import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useForm from '@app/components/Form/useForm';
import StateInput from '@app/components/Form/Inputs/AddressInput/StateInput';
import LicenseInput from '@app/components/Form/Inputs/LicenseInput';
import PrimaryButton from '@app/components/Button/PrimaryButton';
import { PATHS, getThemedPath } from '@app/constants/routes';
import {
  buttonText,
  dataQa,
  genericLPError,
  licenseToVinErrorText
} from './language';
import {
  trackLicenseToVin,
  trackSelectYourVehicle
} from '@app/lib/analytics/analytics/appraisal';

const LicenseStateInput = ({
  handleLicenseToVin,
  checkoutHandleLicenseToVin,
  history,
  theme,
  location,
  showSpinner,
  showDialog,
  buttonColor,
  handleTabClick
}) => {
  const [showLicenseError, setLicenseError] = useState(false);
  const form = useForm({
    defaultValues: {
      licensePlate: '',
      state: ''
    }
  });

  const {
    fields: { licensePlate, state },
    isFormValid
  } = form;

  const handleLicenseStateSubmit = async () => {
    const { pathname } = location;
    showSpinner(true);
    const data = {
      licensePlate: licensePlate.value,
      state: state.value
    };

    const label = 'License Plate';
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
    const licenseToVinFunc =
      pathname === PATHS.checkoutTradeAppraisal.prefix
        ? checkoutHandleLicenseToVin
        : handleLicenseToVin;
    const vinResponse = await licenseToVinFunc(data);
    showSpinner(false);

    if (vinResponse.error && showLicenseError) {
      showDialog('UseVinDialog', { handleTabClick });
    } else if (vinResponse.error) {
      licensePlate.onChange({
        ...licensePlate,
        error: true,
        errorMessage: licenseToVinErrorText
      });
      setLicenseError(true);
    } else if (vinResponse.vehicles.length > 1) {
      trackSelectYourVehicle(category);
      const isCheckoutTrade = pathname === PATHS.checkoutTradeAppraisal.prefix;
      showDialog('MultiSelectDialog', {
        isCheckoutTrade
      });
    } else if (vinResponse.vehicles[0].vin) {
      const vinForPath = vinResponse.vehicles[0].vin;
      let appraisalPath = '';
      if (pathname === PATHS.checkoutTradeAppraisal.prefix) {
        appraisalPath = PATHS.checkoutTradeAppraisal.withParams({
          vin: vinForPath
        });
      } else if (pathname === PATHS.trade.prefix) {
        appraisalPath = PATHS.tradeAppraisal.withParams({ vin: vinForPath });
      } else {
        appraisalPath = getThemedPath(
          PATHS.sellAppraisal.withParams({ vin: vinForPath }),
          theme
        );
      }
      history.push(appraisalPath);
    } else {
      licensePlate.onChange({
        ...licensePlate,
        error: true,
        errorMessage: genericLPError
      });
      setLicenseError(true);
    }
  };

  const handleOnKeyPressEnter = e => {
    if (e.key === 'Enter' && isFormValid) {
      handleLicenseStateSubmit();
    }
  };

  return (
    <Container>
      <InputContainer>
        <LicenseInputContainer
          field={licensePlate}
          onKeyPressEnter={handleOnKeyPressEnter}
        />
        <States field={state} onKeyPressEnter={handleOnKeyPressEnter} />
      </InputContainer>
      <Button
        tabIndex={0}
        onKeyPress={handleOnKeyPressEnter}
        onClick={handleLicenseStateSubmit}
        disabled={!isFormValid}
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

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const LicenseInputContainer = styled(LicenseInput)`
  ${props => props.theme.media.lte('tablet')} {
    width: 70%;
  }
`;

const States = styled(StateInput)`
  ${props => props.theme.media.lte('tablet')} {
    width: 90px;
  }

  ${props => props.theme.media.gte('desktop')} {
    width: 160px;
  }

  & select {
    padding: 10px;
  }
`;

const Button = styled(PrimaryButton)`
  width: 100%;
`;

LicenseStateInput.propTypes = {
  handleLicenseToVin: PropTypes.func,
  checkoutHandleLicenseToVin: PropTypes.func,
  showSpinner: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  showDialog: PropTypes.func,
  theme: PropTypes.string,
  buttonColor: PropTypes.string,
  match: PropTypes.object,
  handleTabClick: PropTypes.func
};

export default LicenseStateInput;
