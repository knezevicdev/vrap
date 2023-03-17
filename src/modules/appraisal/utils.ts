import crypto from 'crypto';

export const uuidCookieName = 'uuid';
import { AppraisalStore } from '../../store/appraisalStore';

import { AppraisalPayload } from 'src/interfaces.d';
import {
  ExtConditionForm,
  IntConditionForm,
  MechConditionForm,
  PersonalInfoForm,
  VehicleHistoryForm,
  VehicleInfoForm,
} from 'src/modules/appraisal/review/store';
import { getUTMParams } from 'src/networking/utils';

function generateUUID4() {
  return crypto.randomBytes(16).toString('hex');
}

function vehicleInformationData(data: VehicleInfoForm) {
  return {
    vin: data.vin,
    year: data.year,
    make: data.make,
    model: data.model,
    trim: data.trim,
    csTrimId: data.csTrimId,
    mileage: data.mileage,
    exteriorColor: data.exteriorColor,
    keysAmount: data.keysAmount,
    options: data.vehicleOptions,
    zipCode: data.zipCode,
  };
}

function vehicleHistoryData(data: VehicleHistoryForm, isTradeIn: boolean) {
  return {
    hasAccident: data.hasAccident,
    repairedAfterAccident: data.repairedAfterAccident,
    titleStatus: data.titleStatus,
    ...(!isTradeIn && { lienType: getLienType(data.lienType) }),
    ...(!isTradeIn && { bankName: data.bankName }),
    ...(isTradeIn && { state: data.state }),
  };
}

function interiorConditionData(data: IntConditionForm) {
  return {
    interiorCondition: data.interiorCondition,
    seats: data.seats,
    smokedIn: data.smokedIn,
    persistentOdors: data.smokedIn,
    ripsOrTearsInSeats: data.ripsOrTearsInSeats,
    damagedElectronic: data.damagedElectronic,
    noInteriorDamage: data.noInteriorDamage,
    damagedDashboardOrPanels: data.damagedDashboardOrPanels,
  };
}

function exteriorConditionData(data: ExtConditionForm) {
  return {
    exteriorCondition: data.exteriorCondition,
    tiresAndWheels: data.tiresAndWheels,
    hailDamage: data.hailDamage,
    afterMarket: data.afterMarket,
    otherAfterMarket: data.otherAfterMarket,
    rust: data.rust,
    dents: data.dents,
    dentsPanels: data.dentsPanels && parseInt(String(data.dentsPanels), 10),
    paintChipping: data.paintChipping,
    paintChippingPanels:
      data.paintChippingPanels &&
      parseInt(String(data.paintChippingPanels), 10),
    scratches: data.scratches,
    scratchesPanels: data.scratchesPanels && parseInt(data.scratchesPanels, 10),
    majorDamageExterior: data.majorDamageExterior,
    panelsWithMajorDamage:
      data.panelsWithMajorDamage &&
      parseInt(String(data.panelsWithMajorDamage), 10),
    frameOrStructuralDamage: data.frameOrStructuralDamage,
    passStateEmissionStandards: data.passStateEmissionStandards,
    wornTires: data.wornTires,
    noExteriorDamage: data.noExteriorDamage,
    fireDamage: data.fireDamage,
    floodDamage: data.floodDamage,
    windshieldCrackedChipped: data.windshieldCrackedChipped,
  };
}

function mechanicalConditionData(data: MechConditionForm) {
  return {
    mechanicalCondition: data.mechanicalCondition,
    runnable: data.runnable,
    warningLights: data.warningLights,
    warningLightsValues: data.warningLightsValues,
    otherWarning: data.otherWarning,
    floodFireDamage: data.floodFireDamage,
    additionalDetails: data.additionalDetails,
    noMechanicalIssues: data.noMechanicalIssues,
    engineIssue: data.engineIssue,
    transmissionIssue: data.transmissionIssue,
  };
}

function personalInformationData(data: PersonalInfoForm) {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
  };
}

function attributionData(data: AppraisalStore) {
  const dealership = (data.dealership || '').toLowerCase();
  const brand = (data.brand || '').toLowerCase();
  const type = (data.type || '').toLowerCase();

  return {
    dealership,
    brand,
    type,
  };
}

function getLienType(lienType: string) {
  if (lienType === 'Neither') {
    return 'none';
  }
  return lienType && lienType.toLowerCase();
}

export function makeRequestBody(
  appraisalData: AppraisalStore
): AppraisalPayload {
  const now = new Date().toISOString();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const lead_id = generateUUID4();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const anonymous_id =
    window.analytics &&
    window.analytics.user &&
    window.analytics.user().anonymousId
      ? window.analytics.user().anonymousId()
      : null;
  const data = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    DateSubmitted: now,
    form: appraisalData.isTradeIn ? 'trade' : appraisalData.form,
    lead_id,
    anonymous_id,
    ...vehicleInformationData(appraisalData.vehicleInfoForm),
    ...vehicleHistoryData(
      appraisalData.vehicleHistoryForm,
      appraisalData.isTradeIn
    ),
    ...interiorConditionData(appraisalData.intConditionForm),
    ...exteriorConditionData(appraisalData.extConditionForm),
    ...mechanicalConditionData(appraisalData.mechConditionForm),
    ...personalInformationData(appraisalData.personalInfoForm),
    ...attributionData(appraisalData),
    ...getUTMParams(),
  };

  return data;
}
