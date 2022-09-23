/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addStyleForDesktop,
  addStyleForMobile,
  addStyleForTablet,
  SelectItem,
} from '@vroom-web/ui-lib';
import { Button } from '@vroom-web/ui-lib';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } = publicRuntimeConfig;

import getConfig from 'next/config';

import { useAppStore } from '../../../../context';
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
import ZipCodeInput from '../forminputs/ZipCodeInput';
import useForm from '../useForm';
import {
  isValidCSLicense,
  isValidVin,
  VROOM_VIN_SUBSTRING,
} from '../validation';
import VehicleInfoViewModel from './ViewModel';

import { GenericObject } from 'src/interfaces.d';

export interface Props {
  form: any;
  fields: any;
  viewModel: VehicleInfoViewModel;
  hideButtonCallback: (hide: boolean) => void;
}

const VehicleInformation: React.FC<Props> = ({
  form,
  fields,
  viewModel,
  hideButtonCallback,
}) => {
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
  const { store } = useAppStore();

  const appraisalPath = store.appraisal.appraisalPath;
  const routerAsPath = router.asPath as string;
  const isEditMode = routerAsPath.includes('#');

  const [vinLoader, setVinLoader] = useState(false);
  const [lpLoader, setLpLoader] = useState(false);
  const [trimLoader, setTrimLoader] = useState(false);
  const [vinDecoded, setVinDecoded] = useState(false);
  const [year, setYear] = useState(null as any);
  const [make, setMake] = useState(null as any);
  const [model, setModel] = useState(null as any);
  const [trims, setTrims] = useState<(SelectItem & GenericObject)[]>([]);
  const [options, setOptions] = useState([] as any[]);
  const [extColors, setExtColors] = useState(defaultColors);
  const [selectedExtColor, setSelectedExtColor] = useState(null as any);
  const [showSubmitError, setShowSubmitError] = useState(false);

  const [showOptionsGroup, setShowOptionsGroup] = useState(options.length > 0);

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

  const recaptchaRef = useRef<any>();

  const resetLocalState = () => {
    setVinDecoded(false);
    setYear(null);
    setMake(null);
    setModel(null);
    setExtColors(defaultColors);
    setTrims([]);
    setOptions([]);
    setSelectedExtColor(null);
    setShowOptionsGroup(false);
  };

  useEffect(() => {
    hideButtonCallback(true);
  }, []);

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
      if (isEditMode) {
        const altsFromStore = viewModel.vehicleDecodeData.alternatives;
        let trimTransform;
        if (altsFromStore.length) {
          trimTransform = altsFromStore.map((t: any) => {
            return {
              ...t,
              label: t.trim,
              value: t.trim,
              trimId: t.id,
            };
          });
        } else if (fields.trim.value !== '') {
          trimTransform = [
            {
              label: fields.trim.value,
              value: fields.trim.value,
            },
          ];
        }
        setTrims(trimTransform);
        setOptions([...viewModel.vehicleDecodeData.features]);
        setShowOptionsGroup(viewModel.vehicleDecodeData.features.length > 0);
        setVinDecoded(true);
        setYear(viewModel.vehicleDecodeData.year);
        setMake(viewModel.vehicleDecodeData.make);
        setModel(viewModel.vehicleDecodeData.model);
      }
      const { vin } = fields;
      vin.onChange({
        ...vin,
        value: vehicleId.toUpperCase(),
      });
    } else if (validLicense) {
      const [state, ...rest] = vehicleId.split('-');
      const license = rest.join('-');
      const errorMessage = VehicleInfoText.licenseError;
      const fieldsToUpdate = updateField(state, license, errorMessage);
      licenseForm.updateMultipleFields(fieldsToUpdate);
    } else {
      resetLocalState();
    }
  }, [router.pathname, router.query]);

  useEffect(() => {
    const fieldsToUpdate: any = {};
    const { vin } = fields;
    const vehicleId = vin.value;
    const validVin =
      vehicleId.includes(VROOM_VIN_SUBSTRING) || isValidVin(vehicleId);
    if (!validVin) {
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
      if (vinDecoded && trims.length === 0) {
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

    hideButtonCallback(!isEditMode && !vinDecoded);
  }, [vinDecoded, fields.vin.value]);

  useEffect(() => {
    const { value: trimIdValue } = fields.csTrimId;
    handleGetOptions(trimIdValue);
  }, [fields.trim.value]);

  useEffect(() => {
    const { value: trimValue, error } = fields.trim;
    const { value: trimIdValue } = fields.csTrimId;
    const trimData = trims.find((trim) => trim.value === trimValue);
    const { vin } = fields;
    const vehicleId = vin.value;
    const validVin =
      vehicleId.includes(VROOM_VIN_SUBSTRING) || isValidVin(vehicleId);

    if (validVin && vinDecoded) {
      if (trims.length === 1) {
        handleTrimChange(trims[0], error);
      } else if (trims.length && trimValue !== '' && trimData) {
        const emptyTrim = { value: null, trim: null, label: null };
        handleTrimChange(emptyTrim, error);
        handleGetOptions(trimIdValue);
      } else {
        handleTrimChange(trimValue, error);
      }
    }
  }, [trims.length, fields.vin.value, vinDecoded]);

  const handleDecodeVin = (vinToDecode: string, captchaToken: string) => {
    const validVin =
      vinToDecode.includes(VROOM_VIN_SUBSTRING) || isValidVin(vinToDecode);
    const errorMessage = VehicleInfoText.vinError;
    const { vin } = fields;
    resetLocalState();

    setVinLoader(true);
    setShowVin(true);
    setShowLicense(false);

    if (validVin) {
      viewModel
        .getVinDecode(vinToDecode, captchaToken)
        .then((response) => {
          const {
            year,
            make,
            model,
            alternatives,
            features,
            exteriorColor,
            trim,
            subTrim,
            style,
          } = response;
          const isError = Object.hasOwnProperty.bind(response)('error');

          vin.onChange({
            ...vin,
            value: vinToDecode.toUpperCase(),
            error: isError,
            errorMessage,
          });

          if (isError) {
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
            alternatives.forEach((t: any) => {
              trimsArr.push({
                ...t,
                label: t.trim,
                value: t.trim,
                trimId: t.id,
              });
            });
          } else if (style) {
            trimsArr.push({ label: style, value: style });
          } else if (trim || subTrim) {
            const concatTrim = `${trim || ''} ${subTrim || ''}`.trim();
            trimsArr.push({ label: concatTrim, value: concatTrim });
          }

          if (alternatives.length === 0 && features.length) {
            setOptions([...features]);
          }

          setYear(year);
          setMake(make);
          setModel(model);
          setSelectedExtColor(csExtColor);
          setTrims([...trimsArr]);
          setShowOptionsGroup(features.length > 0);
          setVinDecoded(true);
        })
        .catch(() => {
          resetLocalState();
        })
        .finally(() => {
          setVinLoader(false);
        });
    } else {
      vin.onChange({
        ...vin,
        value: vinToDecode.toUpperCase(),
        error: !validVin,
        errorMessage,
      });
      resetLocalState();
      setVinLoader(false);
    }
  };

  const updateField = (
    state: string,
    license: string,
    errorMessage: string
  ) => {
    const fieldsToUpdate = {
      licensePlate: {
        ...licenseForm.fields.licensePlate,
        value: license,
        errorMessage,
      },
      state: {
        ...licenseForm.fields.state,
        value: state,
      },
    };
    return fieldsToUpdate;
  };

  const handleDecodeLicense = (lpToDecode: string, captchaToken: string) => {
    const { vin } = fields;
    const errorMessage = VehicleInfoText.licenseError;

    resetLocalState();

    setVinLoader(true);
    setLpLoader(true);

    viewModel
      .getVinDecode(lpToDecode, captchaToken)
      .then((response) => {
        const {
          year,
          make,
          model,
          alternatives,
          features,
          exteriorColor,
          trim,
          subTrim,
          style,
        } = response;
        const trimsArr = [];
        const isError = Object.hasOwnProperty.bind(response)('error');
        if (isError) {
          setLpLoader(false);
          licenseForm.updateMultipleFields({
            licensePlate: {
              ...licenseForm.fields.licensePlate,
              error: true,
              errorMessage,
            },
          });
          return;
        } else {
          setShowVin(true);
          setShowLicense(false);
          const successFieldsToUpdate = updateField('', '', errorMessage);
          licenseForm.updateMultipleFields(successFieldsToUpdate);
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
          alternatives.forEach((t: any) => {
            trimsArr.push({
              ...t,
              label: t.trim,
              value: t.trim,
              trimId: t.id,
            });
          });
        } else if (style) {
          trimsArr.push({ label: style, value: style });
        } else if (trim || subTrim) {
          const concatTrim = `${trim || ''} ${subTrim || ''}`.trim();
          trimsArr.push({ label: concatTrim, value: concatTrim });
        }

        if (alternatives.length === 0 && features.length) {
          setOptions([...features]);
        }

        setYear(year);
        setMake(make);
        setModel(model);
        setSelectedExtColor(csExtColor);
        setTrims([...trimsArr]);
        setShowOptionsGroup(features.length > 0);
        setVinDecoded(true);
      })
      .catch((e) => {
        console.log(e);
        resetLocalState();
      })
      .finally(() => {
        setVinLoader(false);
        setLpLoader(false);
      });
  };

  const isSubmitDisabled = (): boolean => {
    const vin = fields.vin.value;
    const validVin = vin.includes(VROOM_VIN_SUBSTRING) || isValidVin(vin);

    if (vinLoader || lpLoader) {
      return true;
    }

    if (showVin) {
      return !validVin;
    }

    if (showLicense) {
      return !licenseForm.isFormValid;
    }

    return !(validVin || licenseForm.isFormValid);
  };

  const handleTrimChange = (value: any, error: boolean) => {
    const { trim, csTrimId, exteriorColor, vehicleOptions } = fields;
    const fieldsToUpdate: any = {};
    const trimIdVal = value ? value.trimId : null;

    if (!isEditMode) {
      fieldsToUpdate['trim'] = { ...trim, ...value, error };
      fieldsToUpdate['csTrimId'] = { ...csTrimId, value: trimIdVal };

      if (trims.length <= 1) {
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

    if (trimId && !isEditMode) {
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
      setShowOptionsGroup(trimOptions.length > 0);
    } else if (
      viewModel.vehicleDecodeData &&
      viewModel.vehicleDecodeData.features
    ) {
      setOptions([...viewModel.vehicleDecodeData.features]);
      setShowOptionsGroup(viewModel.vehicleDecodeData.features.length > 0);
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

  const handleOnKeyPressEnter = async (e: any) => {
    if (e.key === 'Enter' && isFormValid) {
      await handleVehicleSubmit();
    }
  };

  const handleLicenseStateSubmit = async (license = '') => {
    const licenseForDecode =
      license || `${state.value}-${lettersAndNumbersOnly(licensePlate.value)}`;

    const token = await getCaptchaToken();

    if (token) {
      router.push({
        pathname: appraisalPath,
        query: { vehicle: licenseForDecode, ...router.query },
      });
      handleDecodeLicense(licenseForDecode, token);
    } else {
      setShowSubmitError(true);
      setVinLoader(false);
    }
  };

  const handleVinKeyPressSubmit = () => {
    if (!isSubmitDisabled()) {
      viewModel.trackSubmit('Vin');
      handleVehicleSubmit(fields.vin.value);
    }
  };

  const handleLicensePlateKeyPressSubmit = () => {
    if (!isSubmitDisabled()) {
      viewModel.trackSubmit('License Plate');
      handleVehicleSubmit(fields.vin.value);
    }
  };

  const handleVehicleSubmit = async (vehicle = '') => {
    const isVin =
      /^[A-HJ-NPR-Za-hj-npr-z\d]{8}[\dX][A-HJ-NPR-Za-hj-npr-z\d]{2}\d{6}$/.test(
        vehicle
      ) || fields.vin.value;

    setShowSubmitError(false);

    if (isVin) {
      await handleVinSubmit();
    } else {
      await handleLicenseStateSubmit();
    }
  };

  const handleVinChange = async (vin: string) => {
    fields.vin.onChange({
      ...fields.vin,
      value: vin,
    });
    setVinDecoded(false);
  };

  const handleVinSubmit = async (vin = '') => {
    const token = await getCaptchaToken();
    if (token) {
      router.push({
        pathname: appraisalPath,
        query: { vehicle: vin || fields.vin.value, ...router.query },
      });
      handleDecodeVin(vin || fields.vin.value, token);
    } else {
      setShowSubmitError(true);
      setVinLoader(false);
    }
  };

  const getCaptchaToken = async () => {
    try {
      return await recaptchaRef.current.executeAsync();
    } catch (e) {
      return null;
    } finally {
      recaptchaRef.current.reset();
    }
  };

  return (
    <>
      <LeaseCopy>{VehicleInfoLeaseCopy}</LeaseCopy>
      <InputContainer>
        {showVin && (
          <>
            <VinField>
              <VinFormInput
                field={fields.vin}
                handleUpdate={handleVinChange}
                disabled={isEditMode}
                onKeyPressEnter={handleVinKeyPressSubmit}
              />
            </VinField>
            <LoaderContainer>
              {vinLoader && <Loader isLoading={vinLoader} />}
            </LoaderContainer>
          </>
        )}
        {showLicense && (
          <LicenseContainer>
            <LicenseField>
              <License>
                <LicenseInputContainer
                  field={licensePlate}
                  onKeyPressEnter={handleLicensePlateKeyPressSubmit}
                />
              </License>
              <States
                field={state}
                onKeyPressEnter={handleLicensePlateKeyPressSubmit}
              />
              <LoaderContainer>
                {lpLoader && <Loader isLoading={lpLoader} />}
              </LoaderContainer>
            </LicenseField>
          </LicenseContainer>
        )}
        {!showVin && !showLicense && (
          <AppraisalLicenseToVin
            vin={fields.vin}
            licenseForm={licenseForm}
            onVinKeyPressEnter={handleVinKeyPressSubmit}
            onLicensePlateKeyPressEnter={handleLicensePlateKeyPressSubmit}
          />
        )}
        {vinDecoded && !vinLoader && (
          <YearMakeModel>
            {year} {make} {model}
          </YearMakeModel>
        )}
      </InputContainer>
      {!isEditMode && !vinDecoded && (
        <>
          <SubmitButton
            tabIndex={0}
            onKeyPress={handleOnKeyPressEnter}
            onClick={handleVehicleSubmit}
            disabled={isSubmitDisabled()}
            isCTAColorExp={viewModel.isCTAColorExp}
            data-qa={VehicleInfoText.licenseButtonDataQa}
          >
            {VehicleInfoText.licenseButton}
          </SubmitButton>
          {showSubmitError && (
            <SubmitError>Something went wrong. Please, try again.</SubmitError>
          )}
        </>
      )}
      {!isEditMode && !vinDecoded && (
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        />
      )}
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
          <InputContainer>
            <ZipCodeField field={fields.zipCode} />
          </InputContainer>
          {!isHideHowManyKeysExperiment && (
            <InputContainer>
              <NumberOfKeysInput field={fields.keysAmount} />
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

  ${addStyleForMobile(`
    margin-right: 0 !important;
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
  @media (max-width: 767px) {
    top: 0;
  }
`;

const SubmitButton = styled(({ ...restProps }) => (
  <Button.Primary {...restProps} />
))`
  :enabled {
    background-color: ${(props) =>
      props.isCTAColorExp ? '#308406' : '#E7131A'};
    &:hover {
      background-color: ${(props) =>
        props.isCTAColorExp ? '#309706' : '#d01118'};
    }
  }
  margin-top: 10px;
  width: 48%;

  @media (max-width: 767px) {
    width: 100%;
  }
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
  margin: auto;

  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 21px;
  }
`;

const SubmitError = styled.span`
  color: #e7131a;
  display: block;
  margin-top: 6px;
`;

const TrimField = styled(TrimInput)`
  width: 48%;

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

const VehicleOptionsField = styled(VehicleOptionsGroup)`
  width: 100%;
  padding-top: 10px;
`;

const ZipCodeField = styled(ZipCodeInput)`
  width: 48%;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const LoaderContainer = styled.span`
  display: inline;
  @media (max-width: 767px) {
    display: block;
    text-align: center;
    margin-top: 6px;
  }
`;

export default VehicleInformation;
