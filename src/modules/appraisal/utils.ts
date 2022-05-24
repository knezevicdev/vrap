import crypto from 'crypto';

export const uuidCookieName = 'uuid';
import { AppraisalPayload } from 'src/interfaces.d';
import { getUTMParams } from 'src/networking/utils';

function generateUUID4() {
  return crypto.randomBytes(16).toString('hex');
}

function vehicleInformationData(data: any) {
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
  };
}

function vehicleHistoryData(data: any) {
  return {
    hasAccident: data.hasAccident,
    titleStatus: data.titleStatus,
    lienholder: data.lienholder,
    lxBankName: data.lxBankName,
  };
}

function interiorConditionData(data: any) {
  return {
    interiorCondition: data.interiorCondition,
    seats: data.seats,
    smokedIn: data.smokedIn,
  };
}

function exteriorConditionData(data: any) {
  return {
    exteriorCondition: data.exteriorCondition,
    tiresAndWheels: data.tiresAndWheels,
    hailDamage: data.hailDamage,
    afterMarket: data.afterMarket,
    otherAfterMarket: data.otherAfterMarket,
  };
}

function mechanicalConditionData(data: any) {
  return {
    mechanicalCondition: data.mechanicalCondition,
    runnable: data.runnable,
    warningLights: data.warningLights,
    warningLightsValues: data.warningLightsValues,
    otherWarning: data.otherWarning,
    floodFireDamage: data.floodFireDamage,
    additionalDetails: data.additionalDetails,
  };
}

function personalInformationData(data: any) {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    zipCode: data.zipCode,
  };
}

function attributionData(data: any) {
  const dealership = (data.dealership || '').toLowerCase();
  const brand = (data.brand || '').toLowerCase();
  const type = (data.type || '').toLowerCase();

  return {
    dealership,
    brand,
    type,
  };
}

export function makeRequestBody(appraisalData: any): AppraisalPayload {
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
    lead_id,
    anonymous_id,
    ...vehicleInformationData(appraisalData.vehicleInfoForm),
    ...vehicleHistoryData(appraisalData.vehicleHistoryForm),
    ...interiorConditionData(appraisalData.intConditionForm),
    ...exteriorConditionData(appraisalData.extConditionForm),
    ...mechanicalConditionData(appraisalData.mechConditionForm),
    ...personalInformationData(appraisalData.personalInfoForm),
    ...attributionData(appraisalData),
    ...getUTMParams(),
  };

  return data;
}
