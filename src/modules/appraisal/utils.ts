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
    mileage: data.vin === '1GYS4CKJ0FR202274' ? 900000 : data.mileage, // https://tdalabs.atlassian.net/browse/AC-2649
    exteriorColor: data.exteriorColor,
    keysAmount: '1',
    options: data.vehicleOptions,
    zipCode: data.zipCode,
    appraisalIntent: data.sellOrTradeIn.toLowerCase(),
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
    seats: data.seats || 'Cloth',
    smokedIn: data.smokedIn,
    persistentOdors: data.smokedIn,
    ripsOrTearsInSeats: data.ripsOrTearsInSeats,
    damagedElectronic: data.damagedElectronic,
    noInteriorDamage: data.noInteriorDamage,
    damagedDashboardOrPanels: data.damagedDashboardOrPanels,
    majorDamageInterior: data.majorDamageInterior,
  };
}

function intValueOrZero(value: string | number | undefined | null) {
  if (value) {
    const parsed = parseInt(String(value), 10);
    if (!isNaN(parsed)) return parsed;
  }

  return 0;
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
    dentsPanels: intValueOrZero(data.dentsPanels),
    paintChipping: data.paintChipping,
    paintChippingPanels: intValueOrZero(data.paintChippingPanels),
    scratches: data.scratches,
    scratchesPanels: intValueOrZero(data.scratchesPanels),
    majorDamageExterior: data.majorDamageExterior,
    panelsWithMajorDamage: intValueOrZero(data.panelsWithMajorDamage),
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
