import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  VehicleInfoLeaseCopy,
  VehicleInfoText,
} from './AppraisalForm.language';
import AppraisalLicenseToVin from './forminputs/AppraisalLicenseToVin';
import ExactMileageInput from './forminputs/ExactMileageInput';
import ExtColorInput from './forminputs/ExtColorInput';
import NumberOfKeysInput from './forminputs/NumberOfKeysInput';
import TrimInput from './forminputs/TrimInput';
import VehicleOptionsGroup from './forminputs/VehicleOptionsGroup';
import VinFormInput from './forminputs/VinFormInput';
import { trackMileageChange } from './lib/analytics/analytics/appraisal';
import { VROOM_VIN_SUBSTRING } from './misc';
import { selectExperiment } from './store/absmartly/selectors';
import { APPRAISAL_HIDE_HOW_MANY_KEYS_QUESTION } from './store/absmartly/types';
import {
  decodeVin,
  gradeCheck,
  handleCarfaxCall,
} from './store/appraisal/operations';
import { selectUUID } from './store/auth/selectors';
import { getVinErrors, isValidVin } from './validation';

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
}) => {
  const [vinLoader, setVinLoader] = useState(false);
  const [trimLoader, setTrimLoader] = useState(false);
  const [vinDecoded, setVinDecoded] = useState(false);
  const [year, setYear] = useState(null);
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [trims, setTrims] = useState([]);
  const [options, setOptions] = useState([]);
  const [gqlOptions, setGqlOptions] = useState([]);
  const [extColors, setExtColors] = useState([
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
    const fieldsToUpdate = {};
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
    const trimData = trims.find((trim) => trim.value === trimValue);

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

  const handleDecodeVin = (vinToDecode) => {
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
        .then((response) => {
          const { basicData, trimData, colorData, options } = response;
          setGqlOptions(options);
          const trimsArr = [];
          let extColorArr = [];

          if (trimData.trims) {
            trimData.trims.forEach((t) => {
              trimsArr.push({
                ...t,
                label: t.long_description,
                value: t.long_description,
                tOptions: t.options,
              });
            });
          }

          if (colorData.colors) {
            extColorArr = colorData.colors.map((color) => {
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

  const handleTrimChange = (value, error) => {
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
    trackMileageChange();
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

const LeaseCopy = styled.div`
  padding-left: 8px;
  margin-top: 16px;
  margin-bottom: 32px;
  border-left: 2px ${(props) => props.theme.colors.vroomRed} solid;
  ${(props) => props.theme.typography.bodyBold};
`;

const InputContainer = styled.div`
  display: flex;
  text-align: left;
  margin-top: 10px;
  ${(props) => props.theme.typography.h9()};

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
  ${(props) => props.theme.media.mobile} {
    width: 100%;
  }
`;

const YearMakeModel = styled.div`
  width: 48%;
  font-weight: bold;
  // https://stackoverflow.com/questions/37534254/flex-auto-margin-not-working-in-ie10-11
  align-self: center;
  ${(props) => props.theme.typography.h9('medium')};
  margin: auto auto 21px auto;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
  }
`;

const TrimField = styled(TrimInput)`
  width: 48%;
  margin-bottom: 10px;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
  }
`;

const ExactMileageField = styled(ExactMileageInput)`
  width: 48%;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
  }
`;

const ExteriorColorField = styled(ExtColorInput)`
  width: 48%;
  margin: 0 auto;

  ${(props) => props.theme.media.mobile} {
    width: 100%;
  }
`;

const NumberOfKeysField = styled(NumberOfKeysInput)`
  margin: 0 0 0 1px;

  ${(props) => props.theme.media.mobile} {
    width: 99%;
  }
`;

const VehicleOptionsField = styled(VehicleOptionsGroup)`
  width: 100%;
  padding-top: 10px;
`;

const mapStateToProps = (state) => {
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
