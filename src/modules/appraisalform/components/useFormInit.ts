import useForm from './useForm';

const useAppraisalFormInit = (
  personalInfo,
  vehicleInfo,
  vehicleHistory,
  intCondition,
  extCondition,
  mechCondition,
  yourInformation,
  vinInPath,
  isAppraisalIntentExperiment,
  isDetailedConditionsExperiment,
  isTradeIn,
  isTradeInState
) => {
  if (vinInPath !== vehicleInfo.vin) {
    vehicleInfo = {};
    vehicleHistory = {};
    intCondition = {};
    extCondition = {};
    mechCondition = {};
    yourInformation = {};
  }

  const vehicleInfoFields = {
    vin: vehicleInfo.vin || '',
    trim: vehicleInfo.trim || '',
    mileage: vehicleInfo.mileage || null,
    exteriorColor: vehicleInfo.exteriorColor || '',
    vehicleOptions: {
      value: vehicleInfo.vehicleOptions || [],
      isRequired: false,
    },
    keysAmount: vehicleInfo.keysAmount || '',
  };

  let vehicleHistoryFields = {
    hasAccident: vehicleHistory.hasAccident || '',
    titleStatus: vehicleHistory.titleStatus || '',
  };

  if (isTradeIn && isTradeInState) {
    vehicleHistoryFields = {
      ...vehicleHistoryFields,
      whichStatePurchase: vehicleHistory.whichStatePurchase || '',
    };
  }

  const intConditionFields = {
    interiorCondition: intCondition.interiorCondition || '',
    seats: intCondition.seats || '',
    smokedIn: intCondition.smokedIn || '',
  };

  const extConditionFields = {
    exteriorCondition: extCondition.exteriorCondition || '',
    hailDamage: extCondition.hailDamage || '',
    tiresAndWheels: extCondition.tiresAndWheels || '',
    afterMarket: { value: extCondition.afterMarket || [], isRequired: false },
    otherAfterMarket: {
      value: extCondition.otherAfterMarket || '',
      isRequired: false,
    },
  };

  extConditionFields.rust = {
    value: extCondition.rust || '',
    isRequired: isDetailedConditionsExperiment,
  };
  extConditionFields.dents = {
    value: extCondition.dents || '',
    isRequired: isDetailedConditionsExperiment,
  };
  extConditionFields.paintChipping = {
    value: extCondition.paintChipping || '',
    isRequired: isDetailedConditionsExperiment,
  };
  extConditionFields.scratches = {
    value: extCondition.scratches || '',
    isRequired: isDetailedConditionsExperiment,
  };
  extConditionFields.dentsPanels = {
    value: extCondition.dentsPanels || 0,
    isRequired: false,
  };
  extConditionFields.paintChippingPanels = {
    value: extCondition.paintChippingPanels || 0,
    isRequired: false,
  };
  extConditionFields.scratchesPanels = {
    value: extCondition.scratchesPanels || 0,
    isRequired: false,
  };

  const mechConditionFields = {
    runnable: mechCondition.runnable || '',
    mechanicalCondition: mechCondition.mechanicalCondition || '',
    warningLights: mechCondition.warningLights || '',
    floodFireDamage: mechCondition.floodFireDamage || '',
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
  };

  const yourFirstName = yourInformation.firstName || personalInfo.firstName;
  const yourLastName = yourInformation.lastName || personalInfo.lastName;
  const yourEmail = yourInformation.email || personalInfo.email;
  const yourAppraisalIntent =
    yourInformation.appraisalIntent || personalInfo.appraisalIntent;

  const personalInfoFields = {
    firstName: yourFirstName || '',
    lastName: yourLastName || '',
    email: yourEmail || '',
    zipCode: yourInformation.zipCode || '',
    phoneNumber: {
      value: yourInformation.phoneNumber || '',
      isRequired: false,
    },
  };

  if (isAppraisalIntentExperiment) {
    personalInfoFields.appraisalIntent = yourAppraisalIntent || '';
  }

  const defaultFieldValues = {
    VehicleInfo: {
      defaultValues: vehicleInfoFields,
    },
    VehicleHistory: {
      defaultValues: vehicleHistoryFields,
    },
    IntCondition: {
      defaultValues: intConditionFields,
    },
    ExtCondition: {
      defaultValues: extConditionFields,
    },
    MechCondition: {
      defaultValues: mechConditionFields,
    },
    PersonalInfo: {
      defaultValues: personalInfoFields,
    },
  };

  return {
    vehicleInfoForm: useForm(defaultFieldValues.VehicleInfo),
    vehicleHistoryForm: useForm(defaultFieldValues.VehicleHistory),
    intConditionForm: useForm(defaultFieldValues.IntCondition),
    extConditionForm: useForm(defaultFieldValues.ExtCondition),
    mechConditionForm: useForm(defaultFieldValues.MechCondition),
    personalInfoForm: useForm(defaultFieldValues.PersonalInfo),
  };
};

export default useAppraisalFormInit;
