import crypto from 'crypto';

export const uuidCookieName = 'uuid';

function generateUUID4() {
  return crypto.randomBytes(16).toString('hex');
}

function vehicleInformationData(data) {
  return {
    vin: data.vin,
    year: data.year,
    make: data.make,
    model: data.model,
    trim: data.trim,
    mileage: data.mileage,
    exteriorColor: data.exteriorColor,
    keysAmount: data.keysAmount,
    options: data.vehicleOptions,
  };
}

function vehicleHistoryData(data) {
  return {
    hasAccident: data.hasAccident,
    titleStatus: data.titleStatus,
  };
}

function interiorConditionData(data) {
  return {
    interiorCondition: data.interiorCondition,
    seats: data.seats,
    smokedIn: data.smokedIn,
  };
}

function exteriorConditionData(data) {
  return {
    exteriorCondition: data.exteriorCondition,
    tiresAndWheels: data.tiresAndWheels,
    hailDamage: data.hailDamage,
    afterMarket: data.afterMarket,
    otherAfterMarket: data.otherAfterMarket,
  };
}

function mechanicalConditionData(data) {
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

function personalInformationData(data) {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    zipCode: data.zipCode,
  };
}

function attributionData(data) {
  const dealership = (data.dealership || '').toLowerCase();
  const brand = (data.brand || '').toLowerCase();
  const type = (data.type || '').toLowerCase();

  return {
    dealership,
    brand,
    type,
  };
}

export function makeRequestBody(appraisalData) {
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
  };
  Object.assign(
    data,
    vehicleInformationData(appraisalData.vehicleInfoForm),
    vehicleHistoryData(appraisalData.vehicleHistoryForm),
    interiorConditionData(appraisalData.intConditionForm),
    exteriorConditionData(appraisalData.extConditionForm),
    mechanicalConditionData(appraisalData.mechConditionForm),
    personalInformationData(appraisalData.personalInfoForm),
    attributionData(appraisalData)
  );

  return { payload: data };
}
