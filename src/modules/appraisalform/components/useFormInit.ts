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

  const vehicleInfoFields = {
    vin: vehicleInfo.vin || '',
    trim: vehicleInfo.trim || '',
    csTrimId: {
      value: vehicleInfo.csTrimId || null,
      isRequired: false,
    },
    zipCode: vehicleInfo.zipCode || '',
    mileage: vehicleInfo.mileage || null,
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
  };

  const vehicleHistoryFields = {
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
  };

  const intConditionFields = {
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
  };

  const extConditionFields = {
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
  };

  const mechConditionFields = {
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
  };

  const yourFirstName = yourInformation.firstName || personalInfo.firstName;
  const yourLastName = yourInformation.lastName || personalInfo.lastName;
  const yourEmail = yourInformation.email || personalInfo.email;

  const personalInfoFields = {
    firstName: yourFirstName || '',
    lastName: yourLastName || '',
    email: yourEmail || '',
    phoneNumber: {
      value: yourInformation.phoneNumber || '',
      isRequired: false,
    },
  };

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
