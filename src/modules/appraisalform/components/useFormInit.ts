/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo } from 'react';

import useForm from './useForm';

const useAppraisalFormInit = (
  personalInfo: any,
  vehicleInfo: any,
  vehicleHistory: any,
  intCondition: any,
  extCondition: any,
  mechCondition: any,
  yourInformation: any,
  vinInPath: any,
  isTradeIn: boolean
) => {
  if (vinInPath !== vehicleInfo.vin) {
    vehicleInfo = {};
    vehicleHistory = {};
    intCondition = {};
    extCondition = {};
    mechCondition = {};
    yourInformation = {};
  }

  const vehicleInfoFields = useMemo(
    () => ({
      vin: vehicleInfo.vin || '',
      trim: vehicleInfo.trim || '',
      csTrimId: {
        value: vehicleInfo.csTrimId || null,
        isRequired: false,
      },
      mileage: vehicleInfo.mileage || null,
      zipCode: vehicleInfo.zipCode || '',
      exteriorColor: vehicleInfo.exteriorColor || '',
      vehicleOptions: {
        value: vehicleInfo.vehicleOptions || [],
        isRequired: false,
      },
      keysAmount: {
        value: vehicleInfo.keysAmount || '1',
        isRequired: false,
      },
      sellOrTradeIn: vehicleInfo.sellOrTradeIn || '',
    }),
    [
      vehicleInfo.csTrimId,
      vehicleInfo.exteriorColor,
      vehicleInfo.keysAmount,
      vehicleInfo.mileage,
      vehicleInfo.sellOrTradeIn,
      vehicleInfo.trim,
      vehicleInfo.vehicleOptions,
      vehicleInfo.vin,
      vehicleInfo.zipCode,
    ]
  );

  const vehicleHistoryFields = useMemo(
    () => ({
      hasAccident: vehicleHistory.hasAccident || '',
      repairedAfterAccident: {
        value: vehicleHistory.repairedAfterAccident || '',
        isRequired: false,
      },
      titleStatus: vehicleHistory.titleStatus || '',
      state: {
        value: vehicleHistory.state || '',
        isRequired: isTradeIn,
      },
      lienType: {
        value: vehicleHistory.lienType || '',
        isRequired: !isTradeIn,
      },
      bankName: {
        value: vehicleHistory.bankName || '',
        isRequired: !isTradeIn && vehicleHistory.lienType !== 'Neither',
      },
    }),
    [
      isTradeIn,
      vehicleHistory.bankName,
      vehicleHistory.hasAccident,
      vehicleHistory.lienType,
      vehicleHistory.repairedAfterAccident,
      vehicleHistory.state,
      vehicleHistory.titleStatus,
    ]
  );

  const intConditionFields = useMemo(
    () => ({
      interiorCondition: {
        value: intCondition.interiorCondition || '',
        isRequired: false,
      },
      seats: {
        value: intCondition.seats || 'Cloth',
        isRequired: false,
      },
      smokedIn: intCondition.smokedIn || 'No',
      ripsOrTearsInSeats: {
        value: intCondition.ripsOrTearsInSeats || 'No',
        isRequired: false,
      },
      damagedElectronic: intCondition.damagedElectronic || 'No',
      damagedDashboardOrPanels: intCondition.damagedDashboardOrPanels || 'No',
      noInteriorDamage: intCondition.noInteriorDamage || 'No',
      majorDamageInterior: intCondition.majorDamageInterior || 'No',
    }),
    [
      intCondition.damagedDashboardOrPanels,
      intCondition.damagedElectronic,
      intCondition.interiorCondition,
      intCondition.majorDamageInterior,
      intCondition.noInteriorDamage,
      intCondition.ripsOrTearsInSeats,
      intCondition.seats,
      intCondition.smokedIn,
    ]
  );

  const extConditionFields = useMemo(
    () => ({
      exteriorCondition: {
        value: extCondition.exteriorCondition || '',
        isRequired: false,
      },
      hailDamage: extCondition.hailDamage || 'No',
      tiresAndWheels: {
        value: extCondition.tiresAndWheels || '',
        isRequired: false,
      },
      afterMarket: { value: extCondition.afterMarket || [], isRequired: false },
      passStateEmissionStandards: {
        value: extCondition.passStateEmissionStandards || '',
        isRequired: false,
      },
      otherAfterMarket: {
        value: extCondition.otherAfterMarket || '',
        isRequired: false,
      },
      rust: {
        value: extCondition.rust || 'No',
        isRequired: true,
      },
      windshieldCrackedChipped: {
        value: extCondition.windshieldCrackedChipped || 'No',
        isRequired: true,
      },
      dents: {
        value: extCondition.dents || 'No',
        isRequired: true,
      },
      majorDamageExterior: {
        value: extCondition.majorDamageExterior || 'No',
        isRequired: true,
      },
      paintChipping: {
        value: extCondition.paintChipping || 'No',
        isRequired: true,
      },
      scratches: {
        value: extCondition.scratches || 'No',
        isRequired: true,
      },
      dentsPanels: {
        value: extCondition.dentsPanels || 0,
        isRequired: false,
      },
      paintChippingPanels: {
        value: extCondition.paintChippingPanels || 0,
        isRequired: false,
      },
      scratchesPanels: {
        value: extCondition.scratchesPanels || 0,
        isRequired: false,
      },
      panelsWithMajorDamage: {
        value: extCondition.panelsWithMajorDamage || 0,
        isRequired: false,
      },
      floodDamage: extCondition.floodDamage || 'No',
      fireDamage: extCondition.fireDamage || 'No',
      wornTires: extCondition.wornTires || 'No',
      noExteriorDamage: extCondition.noExteriorDamage || 'No',
      frameOrStructuralDamage: extCondition.frameOrStructuralDamage || 'No',
    }),
    [
      extCondition.afterMarket,
      extCondition.dents,
      extCondition.dentsPanels,
      extCondition.exteriorCondition,
      extCondition.fireDamage,
      extCondition.floodDamage,
      extCondition.frameOrStructuralDamage,
      extCondition.hailDamage,
      extCondition.majorDamageExterior,
      extCondition.noExteriorDamage,
      extCondition.otherAfterMarket,
      extCondition.paintChipping,
      extCondition.paintChippingPanels,
      extCondition.panelsWithMajorDamage,
      extCondition.passStateEmissionStandards,
      extCondition.rust,
      extCondition.scratches,
      extCondition.scratchesPanels,
      extCondition.tiresAndWheels,
      extCondition.windshieldCrackedChipped,
      extCondition.wornTires,
    ]
  );

  const mechConditionFields = useMemo(
    () => ({
      runnable: mechCondition.runnable || 'Yes',
      mechanicalCondition: {
        value: mechCondition.mechanicalCondition || '',
        isRequired: false,
      },
      warningLights: mechCondition.warningLights || 'No',
      floodFireDamage: {
        value: mechCondition.floodFireDamage || '',
        isRequired: false,
      },
      warningLightsValues: {
        value: mechCondition.warningLightsValues || [],
        isRequired: false,
      },
      otherWarning: {
        value: mechCondition.otherWarning || '',
        isRequired: false,
      },
      additionalDetails: {
        value: mechCondition.additionalDetails || '',
        isRequired: false,
      },
      transmissionIssue: mechCondition.transmissionIssue || 'No',
      engineIssue: mechCondition.engineIssue || 'No',
      noMechanicalIssues: mechCondition.noMechanicalIssues || 'No',
    }),
    [
      mechCondition.additionalDetails,
      mechCondition.engineIssue,
      mechCondition.floodFireDamage,
      mechCondition.mechanicalCondition,
      mechCondition.noMechanicalIssues,
      mechCondition.otherWarning,
      mechCondition.runnable,
      mechCondition.transmissionIssue,
      mechCondition.warningLights,
      mechCondition.warningLightsValues,
    ]
  );

  const yourFirstName = yourInformation.firstName || personalInfo.firstName;
  const yourLastName = yourInformation.lastName || personalInfo.lastName;
  const yourEmail = yourInformation.email || personalInfo.email;

  const personalInfoFields = useMemo(
    () => ({
      firstName: yourFirstName || '',
      lastName: yourLastName || '',
      email: yourEmail || '',
      phoneNumber: {
        value: yourInformation.phoneNumber || '',
        isRequired: false,
      },
    }),
    [yourEmail, yourFirstName, yourInformation.phoneNumber, yourLastName]
  );

  const defaultFieldValues = useMemo(
    () => ({
      VehicleInfo: {
        defaultValues: vehicleInfoFields,
        formKey: 'vehicleInfo',
      },
      VehicleHistory: {
        defaultValues: vehicleHistoryFields,
        formKey: 'vehicleHistory',
      },
      IntCondition: {
        defaultValues: intConditionFields,
        formKey: 'intCondition',
      },
      ExtCondition: {
        defaultValues: extConditionFields,
        formKey: 'extCondition',
      },
      MechCondition: {
        defaultValues: mechConditionFields,
        formKey: 'mechCondition',
      },
      PersonalInfo: {
        defaultValues: personalInfoFields,
        formKey: 'personalInfo',
      },
    }),
    [
      extConditionFields,
      intConditionFields,
      mechConditionFields,
      personalInfoFields,
      vehicleHistoryFields,
      vehicleInfoFields,
    ]
  );

  const vehicleInfoForm = useForm(defaultFieldValues.VehicleInfo);
  const vehicleHistoryForm = useForm(defaultFieldValues.VehicleHistory);
  const intConditionForm = useForm(defaultFieldValues.IntCondition);
  const extConditionForm = useForm(defaultFieldValues.ExtCondition);
  const mechConditionForm = useForm(defaultFieldValues.MechCondition);
  const personalInfoForm = useForm(defaultFieldValues.PersonalInfo);

  return {
    vehicleInfoForm,
    vehicleHistoryForm,
    intConditionForm,
    extConditionForm,
    mechConditionForm,
    personalInfoForm,
  };
};

export default useAppraisalFormInit;
