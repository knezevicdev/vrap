/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useRecaptcha } from '../../../../context/Recaptcha';
import useIsTradeIn from '../../../../hooks/useIsTradeIn';
import AnalyticsHandler from '../../../../integrations/AnalyticsHandler';
import { useRestrictedAppraisal } from '../../../../integrations/RestrictedAppraisalContext';
import useAppraisalStore from '../../../../store/appraisalStore';
import { lettersAndNumbersOnly } from '../formatting';
import AppraisalLicenseToVin from '../forminputs/AppraisalLicenseToVin';
import SellOrTradeInInput from '../forminputs/SellOrTradeInInput';
import VinFormInput from '../forminputs/VinFormInput';
import useForm from '../useForm';
import {
  isValidCSLicense,
  isValidVin,
  VROOM_VIN_SUBSTRING,
} from '../validation';
import {
  ExactMileageField,
  ExteriorColorField,
  InputContainer,
  LeaseCopy,
  License,
  LicenseField,
  LicenseInputContainer,
  Loader,
  LoaderContainer,
  LoadingSpinner,
  States,
  SubmitButton,
  SubmitError,
  TrimField,
  VehicleOptionsField,
  VinField,
  YearMakeModel,
  ZipCodeField,
} from './Style.css';
import useDecodeLicensePlate from './utils/useDecodeLicensePlate';
import useDecodeVin from './utils/useDecodeVin';
import useGetTrimFeatures from './utils/useGetTrimFeatures';
import useGetTrims from './utils/useGetTrims';
import useGetVinDecode from './utils/useGetVinDecode';
import useGradeCheck from './utils/useGradeCheck';
import useLocalState from './utils/useLocalState';

export interface Props {
  form: any;
  fields: any;
  hideButtonCallback: (hide: boolean) => void;
}

const VehicleInformation: React.FC<Props> = ({
  form,
  fields,
  hideButtonCallback,
}) => {
  const isTradeIn = useIsTradeIn();

  const recaptcha = useRecaptcha();

  const { loaded: isRestrictedAppraisalLoaded } = useRestrictedAppraisal();
  const router = useRouter();
  const vehicleDecodeData = useAppraisalStore(
    (state) => state.vehicleDecodeData
  );

  const appraisalPath = useAppraisalStore((state) => state.appraisalPath());
  const routerAsPath = router.asPath as string;
  const isEditMode = routerAsPath.includes('#');

  const analyticsHandler = useMemo(() => new AnalyticsHandler(), []);

  const [showSubmitError, setShowSubmitError] = useState(false);

  const { localState, resetLocalState, updateLocalState } = useLocalState();
  const getTrimFeatures = useGetTrimFeatures();
  const { isLoading: trimsLoading, getTrims } = useGetTrims(
    recaptcha,
    fields,
    isEditMode,
    updateLocalState,
    vehicleDecodeData,
    getTrimFeatures
  );

  const [viewMode, setViewMode] = useState<'initial' | 'vin' | 'license'>(
    'initial'
  );

  const licenseForm = useForm({
    defaultValues: {
      licensePlate: '',
      state: '',
    },
    formKey: 'licenseForm',
  });

  const {
    fields: { licensePlate, state },
    isFormValid,
  } = licenseForm;

  useEffect(() => {
    hideButtonCallback(true);
  }, []);

  useEffect(() => {
    const vehicleId = router.query.vehicle || fields.vin.value;
    const validVin =
      vehicleId.includes(VROOM_VIN_SUBSTRING) || isValidVin(vehicleId);
    const validLicense = isValidCSLicense(vehicleId);
    if (validVin) {
      setViewMode('vin');
    } else if (validLicense) {
      setViewMode('license');
    }

    if (validVin) {
      if (isEditMode) {
        const altsFromStore = vehicleDecodeData.alternatives;
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

        updateLocalState({
          trims: trimTransform,
          options: [...vehicleDecodeData.features],
          showOptionsGroup: vehicleDecodeData.features.length > 0,
          vinDecoded: true,
          year: vehicleDecodeData.year,
          make: vehicleDecodeData.make,
          model: vehicleDecodeData.model,
        });
      }
      const { vin } = fields;
      vin.onChange({
        ...vin,
        value: vehicleId.toUpperCase(),
      });
    } else if (validLicense) {
      const [state, ...rest] = vehicleId.split('-');
      const license = rest.join('-');
      const errorMessage = 'Please enter a valid license plate number';
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
    } else if (
      vin.value !== '' &&
      localState.year === 0 &&
      localState.make === '' &&
      localState.model === ''
    ) {
      resetLocalState();
      vin.onChange({
        ...vin,
        validationError: true,
        errorMessage: 'we could not find that vin. please try again.',
      });
    } else {
      // looks messy but trying to limit needless renders via useForm
      if (localState.vinDecoded && localState.trims.length === 0) {
        fieldsToUpdate.trim = {
          ...fields.trim,
          isRequired: false,
        };
      }

      if (localState.extColors.length === 0) {
        fieldsToUpdate.exteriorColor = {
          ...fields.exteriorColor,
          isRequired: false,
        };
      }

      if (Object.keys(fieldsToUpdate).length) {
        form.updateMultipleFields(fieldsToUpdate);
      }
    }

    hideButtonCallback(!isEditMode && !localState.vinDecoded);
  }, [localState.vinDecoded, fields.vin.value]);

  useEffect(() => {
    const { value: trimIdValue } = fields.csTrimId;
    getTrims(trimIdValue);
  }, [fields.trim.value]);

  useEffect(() => {
    const { value: trimValue, error } = fields.trim;
    const { value: trimIdValue } = fields.csTrimId;
    const trimData = localState.trims.find((trim) => trim.value === trimValue);
    const { vin } = fields;
    const vehicleId = vin.value;
    const validVin =
      vehicleId.includes(VROOM_VIN_SUBSTRING) || isValidVin(vehicleId);

    if (validVin && localState.vinDecoded) {
      if (localState.trims.length === 1) {
        handleTrimChange(localState.trims[0], error);
      } else if (localState.trims.length && trimValue !== '' && trimData) {
        const emptyTrim = { value: null, trim: null, label: null };
        handleTrimChange(emptyTrim, error);
        getTrims(trimIdValue);
      } else {
        handleTrimChange(trimValue, error);
      }
    }
  }, [localState.trims.length, fields.vin.value, localState.vinDecoded]);

  const getVinDecode = useGetVinDecode();

  const { decodeVin, isLoading: isVinLoading } = useDecodeVin(
    fields,
    resetLocalState,
    getVinDecode,
    updateLocalState,
    setViewMode,
    localState.extColors
  );

  const updateField = useCallback(
    (state: string, license: string, errorMessage: string) => {
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
    },
    [licenseForm.fields.licensePlate, licenseForm.fields.state]
  );

  const { isLoading: isLicensePlateLoading, decodeLicensePlate } =
    useDecodeLicensePlate(
      fields,
      resetLocalState,
      getVinDecode,
      updateLocalState,
      setViewMode,
      localState.extColors,
      licenseForm,
      updateField
    );

  const isSubmitDisabled = (): boolean => {
    const vin = fields.vin.value;
    const validVin = vin.includes(VROOM_VIN_SUBSTRING) || isValidVin(vin);

    if (isVinLoading || isLicensePlateLoading) {
      return true;
    }

    if (viewMode === 'vin') {
      return !validVin;
    }

    if (viewMode === 'license') {
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

      if (localState.trims.length <= 1) {
        const defaultSelected: any[] = [];
        localState.options.forEach((opt) => {
          if (opt.selected) {
            defaultSelected.push(opt.name);
          }
        });

        fieldsToUpdate['vehicleOptions'] = {
          ...vehicleOptions,
          value: defaultSelected,
        };
      }

      if (localState.selectedExtColor !== null) {
        fieldsToUpdate['exteriorColor'] = {
          ...exteriorColor,
          ...localState.selectedExtColor,
          error,
        };
      }

      form.updateMultipleFields(fieldsToUpdate);
    }
  };

  const gradeCheck = useGradeCheck();

  const handleMileageBlur = useCallback(() => {
    const vin = fields.vin.value;
    const miles = fields.mileage.value;
    const trim = fields.trim.value;
    gradeCheck(localState.make || '', localState.model || '', trim, miles, vin);
    analyticsHandler.trackMileageChange(
      useAppraisalStore.getState().eventCategory()
    );
  }, [
    analyticsHandler,
    fields.mileage.value,
    fields.trim.value,
    fields.vin.value,
    gradeCheck,
    localState.make,
    localState.model,
  ]);

  const handleOnKeyPressEnter = async (e: any) => {
    if (e.key === 'Enter' && isFormValid) {
      await handleVehicleSubmit();
    }
  };

  const handleLicenseStateSubmit = async (license = '') => {
    const licenseForDecode =
      license || `${state.value}-${lettersAndNumbersOnly(licensePlate.value)}`;

    const token = await recaptcha.getToken();

    if (token) {
      router
        .push({
          pathname: appraisalPath,
          query: { vehicle: licenseForDecode, ...router.query },
        })
        .catch((e) => console.error(e));
      decodeLicensePlate(licenseForDecode, token);
    } else {
      setShowSubmitError(true);
    }
  };

  const handleVinKeyPressSubmit = () => {
    if (!isSubmitDisabled()) {
      analyticsHandler.trackLicenseToVin(
        'Vin',
        useAppraisalStore.getState().eventCategory()
      );
      handleVehicleSubmit(fields.vin.value);
    }
  };

  const handleLicensePlateKeyPressSubmit = () => {
    if (!isSubmitDisabled()) {
      analyticsHandler.trackLicenseToVin(
        'License Plate',
        useAppraisalStore.getState().eventCategory()
      );
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
    updateLocalState({
      vinDecoded: false,
    });
  };

  const handleVinSubmit = async (vin = '') => {
    const token = await recaptcha.getToken();
    if (token) {
      router
        .push(
          {
            pathname: appraisalPath,
            query: { vehicle: vin || fields.vin.value, ...router.query },
          },
          undefined,
          { shallow: true }
        )
        .catch((e) => {
          console.error(e);
        });
      decodeVin(vin || fields.vin.value, token);
    } else {
      setShowSubmitError(true);
    }
  };

  return (
    <>
      <LeaseCopy>Please note: we do not purchase leased vehicles.</LeaseCopy>
      <InputContainer>
        {viewMode === 'vin' && (
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
              {isVinLoading && <Loader isLoading={isVinLoading} />}
            </LoaderContainer>
          </>
        )}
        {viewMode === 'license' && (
          <>
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
            </LicenseField>
            <LoaderContainer>
              {isLicensePlateLoading && (
                <Loader isLoading={isLicensePlateLoading} />
              )}
            </LoaderContainer>
          </>
        )}
        {viewMode === 'initial' && (
          <AppraisalLicenseToVin
            vin={fields.vin}
            licenseForm={licenseForm}
            onVinKeyPressEnter={handleVinKeyPressSubmit}
            onLicensePlateKeyPressEnter={handleLicensePlateKeyPressSubmit}
          />
        )}
        {localState.vinDecoded && !isVinLoading && (
          <YearMakeModel>
            {localState.year} {localState.make} {localState.model}
          </YearMakeModel>
        )}
      </InputContainer>
      {!isEditMode && !localState.vinDecoded && (
        <>
          <SubmitButton
            tabIndex={0}
            onKeyPress={handleOnKeyPressEnter}
            onClick={handleVehicleSubmit}
            disabled={isSubmitDisabled() || !isRestrictedAppraisalLoaded}
            data-qa="appraisal license button"
          >
            {!isRestrictedAppraisalLoaded ? (
              <LoadingSpinner />
            ) : (
              "WHAT'S MY CAR WORTH?"
            )}
          </SubmitButton>
          {showSubmitError && (
            <SubmitError>Something went wrong. Please, try again.</SubmitError>
          )}
        </>
      )}
      {localState.vinDecoded && (
        <>
          {localState.trims.length > 0 && (
            <InputContainer>
              <TrimField
                field={fields.trim}
                onChange={handleTrimChange}
                customOptions={localState.trims}
                trimLoader={trimsLoading}
              />
            </InputContainer>
          )}
          <InputContainer>
            <ExactMileageField
              field={fields.mileage}
              handleOnBlur={handleMileageBlur}
            />
            {localState.extColors.length > 0 && (
              <ExteriorColorField
                field={fields.exteriorColor}
                customOptions={localState.extColors}
              />
            )}
          </InputContainer>
          <InputContainer>
            <ZipCodeField field={fields.zipCode} />
          </InputContainer>
          {localState.showOptionsGroup && (
            <InputContainer>
              <VehicleOptionsField
                field={fields.vehicleOptions}
                options={localState.options}
              />
            </InputContainer>
          )}
          {!isTradeIn && <SellOrTradeInInput field={fields.sellOrTradeIn} />}
        </>
      )}
    </>
  );
};

export default VehicleInformation;
