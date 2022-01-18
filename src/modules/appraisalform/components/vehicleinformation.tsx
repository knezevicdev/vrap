/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from '@vroom-web/ui-lib';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
  const defaultColors = [
    { label: 'Beige', value: 'Beige' },
    { label: 'Black', value: 'Black' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Bronze', value: 'Bronze' },
    { label: 'Brown', value: 'Brown' },
    { label: 'Gold', value: 'Gold' },
    { label: 'Gray', value: 'Gray' },
    { label: 'Green', value: 'Green' },
    { label: 'Orange', value: 'Orange' },
    { label: 'Pink', value: 'Pink' },
    { label: 'Purple', value: 'Purple' },
    { label: 'Red', value: 'Red' },
    { label: 'Silver', value: 'Silver' },
    { label: 'Turquoise', value: 'Turquoise' },
    { label: 'White', value: 'White' },
    { label: 'Yellow', value: 'Yellow' },
  ];
  const showOptionsGroup = options.length > 0;
  // const vinUrl = match.params.vin || fields.vin.value ? true : false;
  const vinUrl = fields.vin.value ? true : false; //TODO: make this dynamic

  const [vinLoader, setVinLoader] = useState(false);
  const [trimLoader, setTrimLoader] = useState(false);
  const [vinDecoded, setVinDecoded] = useState(false);
  const [year, setYear] = useState(null);
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [trims, setTrims] = useState([]);
  const [options, setOptions] = useState([]);
  const [extColors, setExtColors] = useState(defaultColors);
  const [selectedExtColor, setSelectedExtColor] = useState(null);

  isHideHowManyKeysExperiment = disableExperiments
    ? false
    : isHideHowManyKeysExperiment;

  const resetLocalState = () => {
    setVinDecoded(false);
    setYear(null);
    setMake(null);
    setModel(null);
    setExtColors(defaultColors);
    setTrims([]);
    setOptions([]);
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

  // useEffect(() => {
  //   const vinNumber = match.params.vin || fields.vin.value;

  const vinNumber = fields.vin.value ? fields.vin.value : '2GEXG6U34K9550139'; //TODO: Make this dynamic

  useEffect(() => {
    const fieldsToUpdate = {};
    const { vin } = fields;
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
      setExtColors(defaultColors);
      setTrims([]);
      setOptions([]);
    } else {
      const { value: trimIdValue } = fields.csTrimId;
      handleGetOptions(trimIdValue);
    }
  }, [fields.trim.value]);

  useEffect(() => {
    const { value: trimValue, error } = fields.trim;
    const { value: trimIdValue } = fields.csTrimId;
    const trimData = trims.find((trim) => trim.value === trimValue);

    if (fields.vin.value !== '') {
      if (trims.length === 1) {
        handleTrimChange(trims[0], error);
      } else if (trims.length && trimValue !== '' && trimData) {
        handleTrimChange(trimValue, error);
        handleGetOptions(trimIdValue);
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

    resetLocalState();

    setVinLoader(true);
    setShowVin(true);
    setShowLicense(false);

    if (vinFromStore) {
      const altsFromStore = vehicleDecodeData.alternatives;
      const trimTransform = altsFromStore.map((t) => {
        return {
          ...t,
          label: t.trim,
          value: t.trim,
          trimId: t.id,
        };
      });
      setTrims(trimTransform);
      setOptions([...vehicleDecodeData.features]);
      setVinDecoded(true);
      setYear(vehicleDecodeData.year);
      setMake(vehicleDecodeData.make);
      setModel(vehicleDecodeData.model);
    } else if (validVin) {
      carstoryDecodeVin(vinToDecode)
        .then((response) => {
          const {
            year,
            make,
            model,
            alternatives,
            features,
            exteriorColor,
            trim,
          } = response;

          vin.onChange({
            ...vin,
            value: vinToDecode.toUpperCase(),
            error: response.hasOwnProperty('error'),
            errorMessage,
          });

          if (response.hasOwnProperty('error')) {
            setVinLoader(false);
            return;
          }

          const trimsArr = [];
          const csExtColor = { label: exteriorColor, value: exteriorColor };

          const foundColor = extColors.find(
            (color) => color.value === exteriorColor
          );

          if (!foundColor) {
            setExtColors([csExtColor, ...extColors]);
          }

          if (alternatives.length > 1) {
            alternatives.forEach((t) => {
              trimsArr.push({
                ...t,
                label: t.trim,
                value: t.trim,
                trimId: t.id,
              });
            });
          } else {
            trimsArr.push({ label: trim, value: trim });
          }

          if (alternatives.length === 0 && features.length) {
            setOptions([...features]);
          }

          setYear(year);
          setMake(make);
          setModel(model);
          setSelectedExtColor(csExtColor);
          setTrims([...trimsArr]);
          setVinDecoded(true);
        })
        .catch(() => {
          resetLocalState();
        });
    } else {
      vin.onChange({
        ...vin,
        value: vinToDecode.toUpperCase(),
        error: !validVin,
        errorMessage,
      });
      resetLocalState();
    }
    setVinLoader(false);
  };

  const handleDecodeLicense = (lpToDecode) => {
    const { vin } = fields;
    const errorMessage = VehicleInfoText.licenseError;

    resetLocalState();

    setVinLoader(true);
    setLpLoader(true);

    carstoryDecodeVin(lpToDecode)
      .then((response) => {
        const {
          year,
          make,
          model,
          alternatives,
          features,
          exteriorColor,
          trim,
        } = response;
        const trimsArr = [];
        if (response.hasOwnProperty('error')) {
          const [state, license] = lpToDecode.split('-');
          const fieldsToUpdate = {
            licensePlate: {
              ...licenseForm.fields.licensePlate,
              value: license,
              error: true,
              errorMessage,
            },
            state: {
              ...licenseForm.fields.state,
              value: state,
            },
          };
          licenseForm.updateMultipleFields(fieldsToUpdate);
          setVinLoader(false);
          setLpLoader(false);
          return;
        } else {
          setShowVin(true);
          setShowLicense(false);
          vin.onChange({
            ...vin,
            value: response.vin.toUpperCase(),
            error: false,
            errorMessage,
          });
        }
        const csExtColor = { label: exteriorColor, value: exteriorColor };

        const foundColor = extColors.find(
          (color) => color.value === exteriorColor
        );

        if (!foundColor) {
          setExtColors([csExtColor, ...extColors]);
        }

        if (alternatives.length > 1) {
          alternatives.forEach((t) => {
            trimsArr.push({
              ...t,
              label: t.trim,
              value: t.trim,
              trimId: t.id,
            });
          });
        } else {
          trimsArr.push({ label: trim, value: trim });
        }

        if (alternatives.length === 0 && features.length) {
          setOptions([...features]);
        }

        setYear(year);
        setMake(make);
        setModel(model);
        setSelectedExtColor(csExtColor);
        setTrims([...trimsArr]);
        setVinDecoded(true);

        setVinLoader(false);
        setLpLoader(false);
      })
      .catch(() => {
        resetLocalState();
        setVinLoader(false);
        setLpLoader(false);
      });
  };

  const handleTrimChange = (value, error) => {
    const { trim, csTrimId, exteriorColor, vehicleOptions } = fields;
    const fieldsToUpdate = {};

    if (!vinFromStore) {
      fieldsToUpdate['trim'] = { ...trim, ...value, error };
      fieldsToUpdate['csTrimId'] = { ...csTrimId, value: value.trimId };

      if (trims.length === 1) {
        const defaultSelected = [];
        options.forEach((opt) => {
          if (opt.selected) {
            defaultSelected.push(opt.name);
          }
        });

        fieldsToUpdate['vehicleOptions'] = {
          ...vehicleOptions,
          value: defaultSelected,
        };
      }

      if (selectedExtColor !== null) {
        fieldsToUpdate['exteriorColor'] = {
          ...exteriorColor,
          ...selectedExtColor,
          error,
        };
      }

      form.updateMultipleFields(fieldsToUpdate);
    }
  };

  const handleGetOptions = async (trimId) => {
    const { vehicleOptions } = fields;
    setTrimLoader(true);

    if (trimId && !vinFromStore) {
      const response = await getCarstoryFeatures(trimId);
      const trimOptions = response.features;
      const defaultSelected = [];
      trimOptions.forEach((opt) => {
        if (opt.selected) {
          defaultSelected.push(opt.name);
        }
      });

      vehicleOptions.onChange({
        ...vehicleOptions,
        value: defaultSelected,
      });
      setOptions([...trimOptions]);
    } else if (vehicleDecodeData.features) {
      setOptions([...vehicleDecodeData.features]);
    }
    setTrimLoader(false);
  };

  const handleMileageBlur = () => {
    const vin = fields.vin.value;
    const miles = fields.mileage.value;
    const trim = fields.trim.value;
    gradeCheck(make, model, trim, miles, vin);
    trackMileageChange();
  };

  const handleOnKeyPressEnter = (e) => {
    if (e.key === 'Enter' && isFormValid) {
      handleLicenseStateSubmit();
    }
  };

  const handleLicenseStateSubmit = () => {
    const licenseForDecode = `${state.value}-${lettersAndNumbersOnly(
      licensePlate.value
    )}`;
    handleDecodeLicense(licenseForDecode);
  };

  return (
    <>
      <LeaseCopy>{VehicleInfoLeaseCopy}</LeaseCopy>
      <InputContainer>
        {vinUrl && showVin && (
          <VinField>
            <VinFormInput
              field={fields.vin}
              vinLoader={vinLoader}
              handleUpdate={handleDecodeVin}
              disabled={vinFromStore}
            />
          </VinField>
        )}
        {vinUrl && showLicense && (
          <LicenseContainer>
            <LicenseField>
              <License>
                <LicenseInputContainer
                  field={licensePlate}
                  onKeyPressEnter={handleOnKeyPressEnter}
                />
                {lpLoader && <Loader isLoading={lpLoader} />}
              </License>
              <States field={state} onKeyPressEnter={handleOnKeyPressEnter} />
            </LicenseField>
            <Button
              tabIndex={0}
              onKeyPress={handleOnKeyPressEnter}
              onClick={handleLicenseStateSubmit}
              disabled={!isFormValid}
              data-qa={VehicleInfoText.licenseButtonDataQa}
            >
              {VehicleInfoText.licenseButton}
            </Button>
          </LicenseContainer>
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

const LicenseContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LicenseField = styled.div`
  display: flex;
  width: 100%;
  ${(props) => props.theme.media.mobile} {
    flex-direction: column;
    width: 100%;
  }
`;

const License = styled.div`
  display: flex;
  width: 50%;
  ${(props) => props.theme.media.mobile} {
    width: 100%;
  }
`;

const LicenseInputContainer = styled(LicenseInput)`
  width: 90%;
  margin-right: 0;

  ${(props) => props.theme.media.lte('tablet')} {
    width: 70%;
  }
`;

const States = styled(StateInput)`
  margin-left: 20px;
  ${(props) => props.theme.media.lte('tablet')} {
    width: 90px;
  }

  ${(props) => props.theme.media.gte('desktop')} {
    width: 160px;
  }

  ${(props) => props.theme.media.mobile} {
    margin-left: 0;
  }

  & select {
    padding: 10px;
  }
`;

const Loader = styled(CircleLoader)`
  position: relative;
  margin: -5px 5px 5px 10px;
`;

const Button = styled(PrimaryButton)`
  margin-top: 10px;
  width: 50%;
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

// VehicleInformation.propTypes = {
//   location: PropTypes.object,
//   form: PropTypes.object,
//   match: PropTypes.object,
//   fields: PropTypes.object,
//   carstoryDecodeVin: PropTypes.func,
//   getCarstoryFeatures: PropTypes.func,
//   gradeCheck: PropTypes.func,
//   disableExperiments: PropTypes.bool,
//   isHideHowManyKeysExperiment: PropTypes.bool,
//   vehicleDecodeData: PropTypes.object
// };

// const mapStateToProps = (state: any) => {
//   const experimentUUID = selectUUID(state);

//   return {
//     experimentUUID,
//     isHideHowManyKeysExperiment: selectExperiment(
//       state,
//       APPRAISAL_HIDE_HOW_MANY_KEYS_QUESTION
//     ),
//   };
// };

// const mapDispatchToProps = {
//   decodeVin,
//   handleCarfaxCall,
//   gradeCheck,
// };

export default VehicleInformation;
