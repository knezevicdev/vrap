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
    zipCode: data.zipCode,
  };
}

function vehicleHistoryData(data: any, isTradeIn: boolean) {
  return {
    hasAccident: data.hasAccident,
    titleStatus: data.titleStatus,
    ...(!isTradeIn && { lienType: getLienType(data.lienType) }),
    ...(!isTradeIn && { bankName: data.bankName }),
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
    rust: data.rust,
    dents: data.dents,
    dentsPanels: data.dentsPanels && parseInt(data.dentsPanels, 10),
    paintChipping: data.paintChipping,
    paintChippingPanels:
      data.paintChippingPanels && parseInt(data.paintChippingPanels, 10),
    scratches: data.scratches,
    scratchesPanels: data.scratchesPanels && parseInt(data.scratchesPanels, 10),
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

function getLienType(lienType: string) {
  if (lienType === 'Neither') {
    return 'none';
  }
  return lienType && lienType.toLowerCase();
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
    form: appraisalData.isTradeIn ? 'trade' : 'sell',
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
