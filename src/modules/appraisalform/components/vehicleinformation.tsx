/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@vroom-web/ui-lib';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'recompose';
import styled from 'styled-components';

import {
  VehicleInfoLeaseCopy,
  VehicleInfoText,
} from '../AppraisalForm.language';
import {
  decodeVin,
  gradeCheck,
  handleCarfaxCall,
} from '../store/appraisal/operations';
import AppraisalLicenseToVin from './forminputs/AppraisalLicenseToVin';
import ExactMileageInput from './forminputs/ExactMileageInput';
import ExtColorInput from './forminputs/ExtColorInput';
import NumberOfKeysInput from './forminputs/NumberOfKeysInput';
import TrimInput from './forminputs/TrimInput';
import VehicleOptionsGroup from './forminputs/VehicleOptionsGroup';
import VinFormInput from './forminputs/VinFormInput';
import { getVinErrors, isValidVin, VROOM_VIN_SUBSTRING } from './validation';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { selectExperiment } from 'src/store/absmartly/selectors';
import { APPRAISAL_HIDE_HOW_MANY_KEYS_QUESTION } from 'src/store/absmartly/types';
import { selectUUID } from 'src/store/auth/selectors';

const VehicleInformation = ({
  match,
  location,
  form,
  fields,
  decodeVin,
  handleCarfaxCall,
  gradeCheck,
  disableExperiments,
  isHideHowManyKeysExperiment,
}: any) => {
  const analyticsHanler = new AnalyticsHandler();
  const [vinLoader, setVinLoader]: any = useState(false);
  const [trimLoader, setTrimLoader]: any = useState(false);
  const [vinDecoded, setVinDecoded]: any = useState(false);
  const [year, setYear]: any = useState(null);
  const [make, setMake]: any = useState(null);
  const [model, setModel]: any = useState(null);
  const [trims, setTrims]: any = useState([]);
  const [options, setOptions]: any = useState([]);
  const [gqlOptions, setGqlOptions]: any = useState([]);
  const [extColors, setExtColors]: any = useState([
    { label: 'Black', value: 'Black' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Brown', value: 'Brown' },
    { label: 'Gray', value: 'Gray' },
    { label: 'Green', value: 'Green' },
    { label: 'Red', value: 'Red' },
    { label: 'Silver', value: 'Silver' },
    { label: 'White', value: 'White' },
    { label: 'Yellow', value: 'Yellow' },
    { label: 'Other', value: 'Other' },
  ]);
  const showOptionsGroup = options.length > 0;
  const vinUrl = match.params.vin || fields.vin.value ? true : false;

  isHideHowManyKeysExperiment = disableExperiments
    ? false
    : isHideHowManyKeysExperiment;

  const resetLocalState = () => {
    setVinDecoded(false);
    setYear(null);
    setMake(null);
    setModel(null);
    setExtColors([]);
    setTrims([]);
  };

  useEffect(() => {
    const keysAmount = fields.keysAmount;
    if (isHideHowManyKeysExperiment) {
      keysAmount.onChange({
        ...keysAmount,
        value: '1',
        isRequired: false,
      });
    } else {
      keysAmount.onChange({
        ...keysAmount,
        isRequired: true,
      });
    }
  }, [isHideHowManyKeysExperiment]);

  useEffect(() => {
    const vinNumber = match.params.vin || fields.vin.value;

    if (vinNumber) {
      handleDecodeVin(vinNumber);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fieldsToUpdate: any = {};
    const { vin } = fields;
    setOptions([]);
    if (!vinDecoded || vin.value === '') {
      resetLocalState();
    } else if (vin.value !== '' && year === 0 && make === '' && model === '') {
      resetLocalState();
      vin.onChange({
        ...vin,
        error: true,
        errorMessage: VehicleInfoText.noYearMakeModel,
      });
    } else {
      // looks messy but trying to limit needless renders via useForm
      if (trims.length === 0) {
        fieldsToUpdate.trim = {
          ...fields.trim,
          isRequired: false,
        };
      }

      if (extColors.length === 0) {
        fieldsToUpdate.exteriorColor = {
          ...fields.exteriorColor,
          isRequired: false,
        };
      }

      if (Object.keys(fieldsToUpdate).length) {
        form.updateMultipleFields(fieldsToUpdate);
      }
    }
  }, [vinDecoded, fields.vin.value]);

  useEffect(() => {
    if (fields.trim.value === '') {
      setExtColors([]);
      setTrims([]);
      setOptions([]);
    } else {
      handleGetOptions();
    }
  }, [fields.trim.value]);

  useEffect(() => {
    const { value: trimValue, error } = fields.trim;
    const trimData = trims.find((trim: any) => trim.value === trimValue);

    if (fields.vin.value !== '') {
      if (trims.length === 1) {
        handleTrimChange(trims[0].value, error);
        handleGetOptions();
      } else if (trims.length && trimValue !== '' && trimData) {
        handleTrimChange(trimValue, error);
        handleGetOptions();
      } else {
        handleTrimChange(trimValue, error);
      }
    }
  }, [trims.length, fields.vin.value]);

  const handleDecodeVin = (vinToDecode: string) => {
    const validVin =
      vinToDecode.includes(VROOM_VIN_SUBSTRING) || isValidVin(vinToDecode);
    const errorMessage = getVinErrors(vinToDecode);
    const { vin } = fields;

    vin.onChange({
      ...vin,
      value: vinToDecode.toUpperCase(),
      error: !validVin,
      errorMessage,
    });

    resetLocalState();

    if (validVin) {
      setVinLoader(true);

      decodeVin(vinToDecode)
        .then((response: any) => {
          const { basicData, trimData, colorData, options } = response;
          setGqlOptions(options);
          const trimsArr: any = [];
          let extColorArr = [];

          if (trimData.trims) {
            trimData.trims.forEach((t: any) => {
              trimsArr.push({
                ...t,
                label: t.long_description,
                value: t.long_description,
                tOptions: t.options,
              });
            });
          }

          if (colorData.colors) {
            extColorArr = colorData.colors.map((color: any) => {
              return {
                label: color,
                value: color,
              };
            });
          }

          setYear(basicData.year);
          setMake(basicData.make);
          setModel(basicData.model);
          setExtColors(extColorArr || extColors);
          setTrims([...trimsArr]);
          setVinDecoded(true);

          setVinLoader(false);
        })
        .catch(() => {
          resetLocalState();
          setVinLoader(false);
        });

      handleCarfaxCall({ vin: vinToDecode });
    } else {
      resetLocalState();
    }
  };

  const handleTrimChange = (value: any, error: any) => {
    const { trim } = fields;
    trim.onChange({ ...trim, ...value, error });
  };

  const handleGetOptions = () => {
    const { trim } = fields;
    const trimOptions = trim.tOptions || gqlOptions;

    setTrimLoader(true);
    setOptions([...trimOptions]);
    setTrimLoader(false);
  };

  const handleMileageBlur = () => {
    const vin = fields.vin.value;
    const miles = fields.mileage.value;
    const trim = fields.trim.value;
    gradeCheck(make, model, trim, miles, vin);

    analyticsHanler.trackMileageChange();
  };

  return (
    <>
      <LeaseCopy>{VehicleInfoLeaseCopy}</LeaseCopy>
      <InputContainer>
        {vinUrl && (
          <VinField>
            <VinFormInput
              field={fields.vin}
              vinLoader={vinLoader}
              handleUpdate={handleDecodeVin}
            />
          </VinField>
        )}
        {!vinUrl && (
          <AppraisalLicenseToVin
            vin={fields.vin}
            vinLoader={vinLoader}
            handleUpdate={handleDecodeVin}
          />
        )}
        {vinDecoded && !vinLoader && (
          <YearMakeModel>
            {year} {make} {model}
          </YearMakeModel>
        )}
      </InputContainer>
      {vinDecoded && (
        <>
          {trims.length > 0 && (
            <InputContainer>
              <TrimField
                field={fields.trim}
                onChange={handleTrimChange}
                customOptions={trims}
                trimLoader={trimLoader}
              />
            </InputContainer>
          )}
          <InputContainer>
            <ExactMileageField
              field={fields.mileage}
              handleOnBlur={handleMileageBlur}
            />
            {extColors.length > 0 && (
              <ExteriorColorField
                field={fields.exteriorColor}
                customOptions={extColors}
              />
            )}
          </InputContainer>
          {!isHideHowManyKeysExperiment && (
            <InputContainer>
              <NumberOfKeysField field={fields.keysAmount} />
            </InputContainer>
          )}
          {showOptionsGroup && (
            <InputContainer>
              <VehicleOptionsField
                field={fields.vehicleOptions}
                options={options}
              />
            </InputContainer>
          )}
        </>
      )}
    </>
  );
};

const LeaseCopy = styled(Typography.Body.Regular)`
  padding-left: 8px;
  margin-top: 16px;
  margin-bottom: 32px;
  border-left: 2px #e7131a solid;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  font-weight: 600;
`;

const InputContainer = styled(Typography.Body.Regular)`
  display: flex;
  text-align: left;
  margin-top: 10px;
  line-height: 18px;
  letter-spacing: 1px;
  ${(props) =>
    props.theme.addStylesFor({
      mobile: `
      flex-direction: column;
      margin-bottom: 0px;
    `,
    })}
`;

const VinField = styled.div`
  width: 48%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const YearMakeModel = styled(Typography.Body.Regular)`
  width: 48%;
  font-weight: bold;
  // https://stackoverflow.com/questions/37534254/flex-auto-margin-not-working-in-ie10-11
  align-self: center;
  /* ${(props) => props.theme.typography.h9('medium')}; */
  margin: auto auto 21px auto;
  line-height: 18px;
  letter-spacing: 1px;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const TrimField = styled(TrimInput)`
  width: 48%;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ExactMileageField = styled(ExactMileageInput)`
  width: 48%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const ExteriorColorField = styled(ExtColorInput)`
  width: 48%;
  margin: 0 auto;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const NumberOfKeysField = styled(NumberOfKeysInput)`
  margin: 0 0 0 1px;

  @media (max-width: 767px) {
    width: 99%;
  }
`;

const VehicleOptionsField = styled(VehicleOptionsGroup)`
  width: 100%;
  padding-top: 10px;
`;

const mapStateToProps = (state: any) => {
  const experimentUUID = selectUUID(state);

  return {
    experimentUUID,
    isHideHowManyKeysExperiment: selectExperiment(
      state,
      APPRAISAL_HIDE_HOW_MANY_KEYS_QUESTION
    ),
  };
};

const mapDispatchToProps = {
  decodeVin,
  handleCarfaxCall,
  gradeCheck,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(VehicleInformation);
