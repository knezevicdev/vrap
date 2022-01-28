/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addStyleForDesktop,
  addStyleForMobile,
  addStyleForTablet,
} from '@vroom-web/ui-lib';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  VehicleInfoLeaseCopy,
  VehicleInfoText,
} from '../../AppraisalForm.language';
import CircleLoader from '../CircleLoader';
import { lettersAndNumbersOnly } from '../formatting';
import AppraisalLicenseToVin from '../forminputs/AppraisalLicenseToVin';
import ExactMileageInput from '../forminputs/ExactMileageInput';
import ExtColorInput from '../forminputs/ExtColorInput';
import LicenseInput from '../forminputs/LicenseInput';
import NumberOfKeysInput from '../forminputs/NumberOfKeysInput';
import StateInput from '../forminputs/StateInput';
import TrimInput from '../forminputs/TrimInput';
import VehicleOptionsGroup from '../forminputs/VehicleOptionsGroup';
import VinFormInput from '../forminputs/VinFormInput';
import useForm from '../useForm';
import {
  getVinErrors,
  isValidCSLicense,
  isValidVin,
  VROOM_VIN_SUBSTRING,
} from '../validation';
import VehicleInfoViewModel from './ViewModel';

import { Button } from 'src/core/Button';

export interface Props {
  form: any;
  fields: any;
  viewModel: VehicleInfoViewModel;
}

const VehicleInformation: React.FC<Props> = ({ form, fields, viewModel }) => {
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
  const router = useRouter();
  const pathname = router.pathname as string;
  const vinFromStore = pathname.includes('#top');
  //const vinUrl = viewModel.vehicleId;

  const [vinLoader, setVinLoader] = useState(false);
  const [lpLoader, setLpLoader] = useState(false);
  const [trimLoader, setTrimLoader] = useState(false);
  const [vinDecoded, setVinDecoded] = useState(false);
  const [year, setYear] = useState(null as any);
  const [make, setMake] = useState(null as any);
  const [model, setModel] = useState(null as any);
  const [trims, setTrims] = useState([] as any[]);
  const [csRespTrimId, setCsRespTrimId] = useState(null);
  const [options, setOptions] = useState([] as any[]);
  const [extColors, setExtColors] = useState(defaultColors);
  const [selectedExtColor, setSelectedExtColor] = useState(null as any);

  const showOptionsGroup = options.length > 0;

  const isHideHowManyKeysExperiment = viewModel.isHideHowManyKeysExperiment;

  const [showVin, setShowVin] = useState(false);
  const [showLicense, setShowLicense] = useState(false);
  const licenseForm = useForm({
    defaultValues: {
      licensePlate: '',
      state: '',
    },
  });

  const {
    fields: { licensePlate, state },
    isFormValid,
  } = licenseForm;

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

  useEffect(() => {
    const vehicleId = router.query.vehicle || fields.vin.value;
    const validVin =
      vehicleId.includes(VROOM_VIN_SUBSTRING) || isValidVin(vehicleId);
    const validLicense = isValidCSLicense(vehicleId);
    setShowVin(validVin);
    setShowLicense(validLicense);

    if (validVin) {
      handleDecodeVin(vehicleId);
    } else if (validLicense) {
      handleDecodeLicense(vehicleId);
    } else {
      resetLocalState();
    }
  }, [router.pathname, router.query]);

  useEffect(() => {
    const fieldsToUpdate: any = {};
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
    const trimIdSelected = trims.find((trim) => trim.trimId === csRespTrimId);

    if (fields.vin.value !== '') {
      if (trims.length === 1) {
        handleTrimChange(trims[0], error);
      } else if (trims.length && trimValue !== '' && trimData) {
        handleTrimChange(trimValue, error);
        handleGetOptions(trimIdValue);
      } else if (trimIdSelected) {
        handleTrimChange(trimIdSelected, error);
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

    resetLocalState();

    setVinLoader(true);
    setShowVin(true);
    setShowLicense(false);

    if (vinFromStore) {
      const altsFromStore = viewModel.vehicleDecodeData.alternatives;
      const trimTransform = altsFromStore.map((t: any) => {
        return {
          ...t,
          label: t.trim,
          value: t.trim,
          trimId: t.id,
        };
      });
      setTrims(trimTransform);
      setOptions([...viewModel.vehicleDecodeData.features]);
      setVinDecoded(true);
      setYear(viewModel.vehicleDecodeData.year);
      setMake(viewModel.vehicleDecodeData.make);
      setModel(viewModel.vehicleDecodeData.model);
    } else if (validVin) {
      viewModel
        .getVinDecode(vinToDecode)
        .then((response) => {
          const {
            year,
            make,
            model,
            alternatives,
            features,
            exteriorColor,
            trim,
            id,
          } = response;
          const isError = Object.hasOwnProperty.bind(response)('error');

          vin.onChange({
            ...vin,
            value: vinToDecode.toUpperCase(),
            error: isError,
            errorMessage,
          });

          if (isError) {
            setVinLoader(false);
            return;
          }

          const trimsArr = [];
          const csExtColor = { label: exteriorColor, value: exteriorColor };

          const foundColor = extColors.find(
            (color) => color.value === exteriorColor
          );

          if (!foundColor && exteriorColor !== null) {
            setExtColors([csExtColor, ...extColors]);
          }

          if (alternatives.length > 1) {
            setCsRespTrimId(id);
            alternatives.forEach((t: any) => {
              trimsArr.push({
                ...t,
                label: t.trim,
                value: t.trim,
                trimId: t.id,
              });
            });
          } else if (trim !== null) {
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

  const handleDecodeLicense = (lpToDecode: string) => {
    const { vin } = fields;
    const errorMessage = VehicleInfoText.licenseError;

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

    resetLocalState();

    setVinLoader(true);
    setLpLoader(true);

    viewModel
      .getVinDecode(lpToDecode)
      .then((response) => {
        const {
          year,
          make,
          model,
          alternatives,
          features,
          exteriorColor,
          trim,
          id,
        } = response;
        const trimsArr = [];
        const isError = Object.hasOwnProperty.bind(response)('error');
        if (isError) {
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

        if (!foundColor && exteriorColor !== null) {
          setExtColors([csExtColor, ...extColors]);
        }

        if (alternatives.length > 1) {
          setCsRespTrimId(id);
          alternatives.forEach((t: any) => {
            trimsArr.push({
              ...t,
              label: t.trim,
              value: t.trim,
              trimId: t.id,
            });
          });
        } else if (trim !== null) {
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
      .catch((e) => {
        console.log(e);
        resetLocalState();
        setVinLoader(false);
        setLpLoader(false);
      });
  };

  const handleTrimChange = (value: any, error: boolean) => {
    const { trim, csTrimId, exteriorColor, vehicleOptions } = fields;
    const fieldsToUpdate: any = {};
    const trimIdVal = value ? value.trimId : null;

    if (!vinFromStore) {
      fieldsToUpdate['trim'] = { ...trim, ...value, error };
      fieldsToUpdate['csTrimId'] = { ...csTrimId, value: trimIdVal };

      if (trims.length === 1) {
        const defaultSelected: any[] = [];
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

  const handleGetOptions = async (trimId: number) => {
    const { vehicleOptions } = fields;
    setTrimLoader(true);

    if (trimId && !vinFromStore) {
      const response = await viewModel.getTrimFeatures(trimId);
      const trimOptions = response.features;
      const defaultSelected: any[] = [];
      trimOptions.forEach((opt: any) => {
        if (opt.selected) {
          defaultSelected.push(opt.name);
        }
      });

      vehicleOptions.onChange({
        ...vehicleOptions,
        value: defaultSelected,
      });
      setOptions([...trimOptions]);
    } else if (viewModel.vehicleDecodeData.features) {
      setOptions([...viewModel.vehicleDecodeData.features]);
    }
    setTrimLoader(false);
  };

  const handleMileageBlur = () => {
    const vin = fields.vin.value;
    const miles = fields.mileage.value;
    const trim = fields.trim.value;
    viewModel.gradeCheck(make, model, trim, miles, vin);
    viewModel.trackMileageChange();
  };

  const handleOnKeyPressEnter = (e: any) => {
    if (e.key === 'Enter' && isFormValid) {
      handleLicenseStateSubmit();
    }
  };

  const handleLicenseStateSubmit = () => {
    const licenseForDecode = `${state.value}-${lettersAndNumbersOnly(
      licensePlate.value
    )}`;
    router.push({
      pathname: '/',
      query: { vehicle: licenseForDecode },
    });
    handleDecodeLicense(licenseForDecode);
  };

  return (
    <>
      <LeaseCopy>{VehicleInfoLeaseCopy}</LeaseCopy>
      <InputContainer>
        {showVin && (
          <VinField>
            <VinFormInput
              field={fields.vin}
              vinLoader={vinLoader}
              handleUpdate={handleDecodeVin}
              disabled={vinFromStore}
            />
          </VinField>
        )}
        {showLicense && (
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
            <SubmitButton
              tabIndex={0}
              onKeyPress={handleOnKeyPressEnter}
              onClick={handleLicenseStateSubmit}
              disabled={!isFormValid}
              data-qa={VehicleInfoText.licenseButtonDataQa}
            >
              {VehicleInfoText.licenseButton}
            </SubmitButton>
          </LicenseContainer>
        )}
        {!showVin && !showLicense && (
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
  border-left: 2px #e7131a solid;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  font-family: Calibre-Semibold;
`;

const InputContainer = styled.div`
  display: flex;
  text-align: left;
  margin-top: 10px;
  line-height: 18px;
  letter-spacing: 1px;
  font-size: 18px;
  font-family: Calibre-Regular;
  @media (max-width: 767px) {
    flex-direction: column;
    margin-bottom: 0px;
  }
`;

const VinField = styled.div`
  width: 48%;
  @media (max-width: 767px) {
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
  ${addStyleForMobile(`
    flex-direction: column;
    width: 100%;
  `)}
`;

const License = styled.div`
  display: flex;
  width: 50%;
  ${addStyleForMobile(`
    width: 100%;
  `)}
`;

const LicenseInputContainer = styled(LicenseInput)`
  width: 90%;
  margin-right: 0;

  ${addStyleForTablet(`
    width: 70%;
  `)}
`;

const States = styled(StateInput)`
  margin-left: 20px;
  ${addStyleForTablet(`
    width: 90px;
  `)}

  ${addStyleForDesktop(`
    width: 160px;
  `)}

  ${addStyleForMobile(`
    margin-left: 0;
  `)}

  & select {
    padding: 10px;
  }
`;

const Loader = styled(CircleLoader)`
  position: relative;
  margin: -5px 5px 5px 10px;
`;

const SubmitButton = styled(({ ...restProps }) => (
  <Button.Primary {...restProps} />
))`
  margin-top: 10px;
  width: 50%;

  ${addStyleForMobile(`
    width: 100%;
  `)}
`;

const YearMakeModel = styled.div`
  width: 48%;
  font-weight: bold;
  // https://stackoverflow.com/questions/37534254/flex-auto-margin-not-working-in-ie10-11
  align-self: center;
  font-family: Calibre-Semibold;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 1px;
  margin: auto auto 21px auto;

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

export default VehicleInformation;
