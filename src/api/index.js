import {
  get,
  post,
  patch,
  put,
  axiosDelete,
  getWithAuthToken,
  postWithAuthToken,
  patchWithAuthToken,
  deleteWithAuthToken,
  putWithAuthToken
} from './httpHandlers';
import {
  getCatalogApiUrl,
  getSimilarVehicleList
} from '@app/pages/Catalog/CatalogApi';
import {
  createVerificationPayload,
  checkAppraisalPayload,
  getDummyOfferResp
} from './utils';
import { globalConfig } from '@app/lib/globalConfig';

// Eventually, we shouldn't need these here
// but let our express server delegate to these services.
const {
  API_URL,
  CREATE_ZENDESK_REQUEST_URL,
  CREDIT_SERVICE_URL,
  MAXMIND_API_URL,
  MAXMIND_API_KEY,
  VROOM_URL,
  HOLD_VALIDATOR_URL,
  INVSEARCH_V3,
  ITERABLE_MESSAGE_ID,
  INTERCHANGE_URL
} = globalConfig;

const supportedSteps = `SelectTradeIn,TradeInVehicle,TradeInLoanInfo,RegistrationAddress,DeliveryAddress,PaymentType,Financing,FinancingPending,FinancingOption,FinancingDeclined,BackendProducts,DepositPaymentInfo,DocumentUpload,Contracting,DealSummary`;
// **** Search ***

async function search(query) {
  return await get(`${API_URL}/v2/Suggestions/Suggest?q=${query}`);
}

// **** Vehicles ****

async function getVehicles(offset, filters, query) {
  return await get(getCatalogApiUrl({ offset, filters, query }));
}

async function getDefaultVehicles(filters, query) {
  return await get(getCatalogApiUrl({ filters, query }));
}

async function getSimilarVehicles(data) {
  return await get(getSimilarVehicleList(data));
}

async function getInventoryCount() {
  return await get(
    getCatalogApiUrl({ filters: { make: 'all-makes', year: 'all-years' } })
  );
}

async function getMakeModelCounts() {
  return await get(`${API_URL}/v2/inventory/make_model_count`);
}

async function getVehicleV3(payload) {
  return await post(`${INVSEARCH_V3}/v3/inventory`, payload);
}

async function getVehicleByVin(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/account/cardetails`,
    authToken,
    data
  );
}

async function getVehicleAvailability(vehicleId) {
  return await get(
    `${HOLD_VALIDATOR_URL}/check-status/?inventoryId=${vehicleId}`
  );
}

async function getVehicleAvailabilityV2(vin) {
  return await get(`${VROOM_URL}/api/vis/available/${vin}`);
}

// ** Appraisals **

async function postAppraisal(data) {
  const appraisalRequestScore = checkAppraisalPayload(data);

  if (appraisalRequestScore >= 3) {
    return getDummyOfferResp(data);
  } else {
    const payload = {
      payload: data
    };

    return await post(
      `${INTERCHANGE_URL}/suyc-api/v1/acquisition/appraisal`,
      payload
    );
  }
}

async function getAppraisalOffer(offer, hash) {
  return await get(`${VROOM_URL}/api/sf/offer?offer=${offer}&hash=${hash}`);
}

async function postAppraisalOffer(data) {
  return await post(`${VROOM_URL}/api/sf/offer`, data);
}

async function handleLicenseToVinApi(data) {
  const payload = {
    payload: data
  };

  return await post(
    `${INTERCHANGE_URL}/suyc-api/v1/GetVinByLicencePlate`,
    payload
  );
}

async function handleCarfaxApi(data) {
  return await post(`${VROOM_URL}/api/appraisal/carfax`, data);
}

async function handleGetOfferDataApi(email) {
  const encodedEmail = encodeURIComponent(email);

  return await get(
    `${VROOM_URL}/api/appraisal/get-offers?email=${encodedEmail}`
  );
}

async function handleGetOfferById(offerID) {
  const encodedOfferID = encodeURIComponent(offerID);
  return await get(
    `${INTERCHANGE_URL}/suyc-api/v1/acquisition/offer?offerID=${encodedOfferID}`
  );
}

async function handleGetAppraisalDataApi(data) {
  const encodedEmail = encodeURIComponent(data.email);
  const encodedVin = encodeURIComponent(data.vin);

  return await get(
    `${INTERCHANGE_URL}/suyc-api/v1/acquisition/appraisal?vin=${encodedVin}&email=${encodedEmail}`
  );
}

async function handleGetAppraisal(offerId) {
  return await get(
    `${VROOM_URL}/api/appraisal/get-appraisal?offerId=${offerId}`
  );
}

async function patchVerification(data) {
  const payload = {
    payload: createVerificationPayload(data)
  };

  return await patch(
    `${INTERCHANGE_URL}/suyc-api/v1/acquisition/verification/form`,
    payload
  );
}

async function postVerification(data) {
  const payload = {
    payload: { offer_id: data.offer_id }
  };

  return await post(
    `${INTERCHANGE_URL}/suyc-api/v1/acquisition/verification/form`,
    payload
  );
}

async function getVerification(offerId) {
  return await get(
    `${INTERCHANGE_URL}/suyc-api/v1/acquisition/verification/form?f=${offerId}`
  );
}

async function postNewVerifyDoc(data) {
  const {
    file: { fileExtension, fileType, originalFileName },
    docOfferId
  } = data;
  const payload = {
    correlationId: docOfferId,
    payload: {
      file_extension: fileExtension,
      file_type: fileType,
      original_file_name: originalFileName
    }
  };

  return await post(
    `${INTERCHANGE_URL}/suyc-api/v1/acquisition/verification/getuploadurl`,
    payload
  );
}

async function deleteVerifyDoc(fileId) {
  return await axiosDelete(
    `${INTERCHANGE_URL}/suyc-api/v1/acquisition/verification/file?fid=${fileId}`
  );
}

async function getDownloadUrl(fileId, offerId) {
  return await get(
    `${INTERCHANGE_URL}/suyc-api/v1/acquisition/verification/getdownloadurl?file=true&fid=${fileId}&offerId=${offerId}`
  );
}

async function getCaf() {
  return await get(
    `${INTERCHANGE_URL}/suyc-api/v1/acquisition/verification/caf`
  );
}

async function getLXBankName(name) {
  return await get(`${VROOM_URL}/api/appraisal/get-lx?name=${name}`);
}

// ** Attribution **

async function postAttribution(data) {
  return await post(`${VROOM_URL}/api/sf/attribution`, data);
}

// ** Web Lead **

async function postWebLead(data) {
  return await post(`${VROOM_URL}/api/weblead/attribution`, data);
}

// ** Credit leads **

async function postCreditLead(data) {
  return await post(CREDIT_SERVICE_URL, data);
}

// ** Vehicle information **

async function getVinDecode(vin) {
  return await get(`${VROOM_URL}/api/appraisal/decode-vin/${vin}`);
}

async function getGradeCheck(make, model, trim, miles, vin) {
  return await get(
    `${VROOM_URL}/api/appraisal/grade-check?make=${make}&model=${model}&trim=${trim}&miles=${miles}&vin=${vin}`
  );
}
// **** Geo data ****

async function getGeoData(clientIp) {
  // eslint-disable-next-line no-console
  console.log(`${MAXMIND_API_URL}/${clientIp || ''}`);

  return await get(`${MAXMIND_API_URL}/${clientIp || ''}`, {
    headers: { Authorization: MAXMIND_API_KEY }
  });
}

// **** Zendesk ****

async function postZendeskTicket(data) {
  return await post(CREATE_ZENDESK_REQUEST_URL, data);
}

// **** Login ****

async function postAuthentication(data) {
  return await post(`${VROOM_URL}/api/auth/signin`, data);
}

// **** Refresh Token ****

async function postRefreshToken(data) {
  return await post(`${VROOM_URL}/api/auth/refreshtoken`, data);
}

// **** Registartion ****

async function postRegistration(data) {
  return await post(`${VROOM_URL}/api/auth/signup`, data);
}

// **** Account ****
async function getIterablePreferences({ email }) {
  return await get(
    `${VROOM_URL}/api/account/subscriptions?email=${email}&id=${ITERABLE_MESSAGE_ID}`
  );
}
// TODO: We will support different sources
async function updateIterablePreferences({ email, isSubscribed }) {
  return await patch(`${VROOM_URL}/api/account/subscriptions`, {
    email,
    id: ITERABLE_MESSAGE_ID,
    subscribed: isSubscribed
  });
}

async function getClientIp() {
  return await get('https://api.ipify.org/');
}

async function postForgotPassword(email) {
  return await post(`${VROOM_URL}/api/auth/forgotpassword`, {
    email
  });
}

async function postChangePassword(data) {
  const clientIp = await getClientIp();
  const config = {
    headers: {
      'X-Forwarded-For': clientIp
    }
  };

  return await post(`${VROOM_URL}/api/auth/confirm-password`, data, config);
}

async function postSignOut() {
  return await postWithAuthToken(`${VROOM_URL}/api/auth/signout`);
}

async function postUpdatePassword(data, authToken) {
  const clientIp = await getClientIp();
  const config = {
    headers: {
      'X-Forwarded-For': clientIp
    }
  };

  return await postWithAuthToken(
    `${VROOM_URL}/api/auth/password`,
    authToken,
    data,
    config
  );
}

async function getMyAccount(authToken) {
  return await getWithAuthToken(`${VROOM_URL}/api/account`, authToken);
}

async function updateMyAccount(data, authToken) {
  return await patchWithAuthToken(`${VROOM_URL}/api/account`, authToken, data);
}

async function saveFavoriteByVin(vin, authToken, data) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/account/favorites/${vin}`,
    authToken,
    data
  );
}

async function getFavoriteVins(authToken, data) {
  return await get(`${VROOM_URL}/api/account/favorites`, {
    headers: { Authorization: authToken },
    data
  });
}

async function deleteFavoriteByVin(vin, authToken, data) {
  return await deleteWithAuthToken(
    `${VROOM_URL}/api/account/favorites/${vin}`,
    authToken,
    data
  );
}

async function postNewAddress(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/account/addresses`,
    authToken,
    data
  );
}

async function editAddress(data, addrId, authToken) {
  return await putWithAuthToken(
    `${VROOM_URL}/api/account/addresses/${addrId}`,
    authToken,
    data
  );
}

// **** Files **** //
async function postNewFile(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/account/files`,
    authToken,
    data
  );
}

async function getFileUrl(fileId, authToken, data) {
  return await get(`${VROOM_URL}/api/account/files/fileUrl/${fileId}`, {
    headers: { Authorization: authToken },
    data
  });
}

async function getAllFiles(authToken, data) {
  return await get(`${VROOM_URL}/api/account/files/allFiles`, {
    headers: { Authorization: authToken },
    data
  });
}

async function deleteFile(fileId, authToken, data) {
  return await deleteWithAuthToken(
    `${VROOM_URL}/api/account/files/${fileId}`,
    authToken,
    data
  );
}

async function putFile(fileuploadurl, file) {
  return await put(fileuploadurl, file, { reportProgress: true });
}

// **** Deal
async function getDeal(authToken, dealID, data) {
  const { accountId, uuid } = data;
  return await get(
    `${VROOM_URL}/api/deal/my-deals/${dealID}/${accountId}/${uuid}`,
    {
      headers: {
        Authorization: authToken,
        'supported-steps': supportedSteps
      }
    }
  );
}

async function getDealStep(authToken, dealID, data) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/deal/my-deal-step`,
    authToken,
    data
  );
}

async function getDealHoldAmount(authToken, data) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/deal/hold-amount`,
    authToken,
    data
  );
}

async function getAllDeals(authToken, data) {
  return await get(`${VROOM_URL}/api/deal/my-deals`, {
    headers: { Authorization: authToken, 'Cache-Control': 'no-cache' },
    data
  });
}

async function createDeal(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/deal/my-deals/create`,
    authToken,
    data,
    {
      headers: {
        'supported-steps': supportedSteps
      }
    }
  );
}

async function updateDeal(data, authToken) {
  return await putWithAuthToken(
    `${VROOM_URL}/api/deal/my-deals/update`,
    authToken,
    data,
    {
      headers: {
        'supported-steps': supportedSteps
      }
    }
  );
}

async function deleteDeal(deal_ID, data, authToken) {
  return await deleteWithAuthToken(
    `${VROOM_URL}/api/deal/my-deals/delete/${deal_ID}`,
    authToken,
    data
  );
}

async function estimateDeal(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/deal/my-deals/estimate`,
    authToken,
    data
  );
}

async function postDeposit(data, authToken) {
  return await postWithAuthToken(`${VROOM_URL}/api/deal/hold`, authToken, data);
}

async function postCreditApp(data, authToken, deal_id) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/deal/credit/${deal_id}`,
    authToken,
    data
  );
}

async function dealAddDocument(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/deal/documents/add`,
    authToken,
    data
  );
}

async function dealDeleteDocument(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/deal/documents/delete`,
    authToken,
    data
  );
}

async function inventorySoldStatus(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/deal/soldStatus`,
    authToken,
    data
  );
}

async function getAppraisalForDeal(authToken, data) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/deal/my-deal/appraisal`,
    authToken,
    data
  );
}
// **** Logging
async function postLog(level, message, meta) {
  return await post(`${VROOM_URL}/log`, {
    level,
    message,
    meta
  });
}

// **** Careers
function getNumberOfCareerPositions(onSuccess, onError) {
  get(`${VROOM_URL}/api/lever/positions`)
    .then(onSuccess)
    .catch(onError);
}

function getPositionForListing(id, onSuccess, onError) {
  get(`${VROOM_URL}/api/lever/position/${id}`)
    .then(onSuccess)
    .catch(onError);
}

function getPositionsList(groupId, onSuccess, onError) {
  groupId = groupId ? groupId.charAt(0).toUpperCase() + groupId.slice(1) : '';
  get(`${VROOM_URL}/api/lever/positions/${groupId}`)
    .then(onSuccess)
    .catch(onError);
}

function getGroupCount(onSuccess, onError) {
  get(`${VROOM_URL}/api/lever/group-counts`)
    .then(onSuccess)
    .catch(onError);
}

// **** Reviews

async function getHighlights() {
  return await get(`${VROOM_URL}/api/reviews/highlights`);
}

async function getSummary() {
  return await get(`${VROOM_URL}/api/reviews/summary`);
}

async function getAllReviews(minRating, start) {
  return await get(
    `${VROOM_URL}/api/reviews?minRating=${minRating}&start=${start}`
  );
}

async function postNotifyMe(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/account/notifyme`,
    authToken,
    data
  );
}

// async function postNotifyMeRegister() {
//   return await post(`${VROOM_URL}/api/account/notifyme/register`, {});
// }

async function postNotifyMeRegister(data, authToken) {
  return await postWithAuthToken(
    `${VROOM_URL}/api/account/notifyme/register`,
    authToken,
    data
  );
}

/* NOTE: (July 11, 2019): Should these all be exported from the same file?
Seems like we may want to break these out into separate files,
if the number of api handlers continues to grow.
*/
export {
  search,
  getVehicles,
  getDefaultVehicles,
  getSimilarVehicles,
  getInventoryCount,
  getMakeModelCounts,
  getVehicleByVin,
  getVehicleV3,
  getVehicleAvailability,
  postDeposit,
  postAppraisal,
  getAppraisalOffer,
  postAppraisalOffer,
  handleLicenseToVinApi,
  handleCarfaxApi,
  handleGetOfferDataApi,
  handleGetOfferById,
  handleGetAppraisalDataApi,
  handleGetAppraisal,
  postAttribution,
  postWebLead,
  postCreditLead,
  getGeoData,
  postZendeskTicket,
  postAuthentication,
  postRegistration,
  getClientIp,
  postForgotPassword,
  postChangePassword,
  postSignOut,
  postUpdatePassword,
  getMyAccount,
  updateMyAccount,
  saveFavoriteByVin,
  getFavoriteVins,
  deleteFavoriteByVin,
  postNewAddress,
  editAddress,
  postNewFile,
  putFile,
  getAllFiles,
  deleteFile,
  getFileUrl,
  postLog,
  getNumberOfCareerPositions,
  getPositionForListing,
  getPositionsList,
  getGroupCount,
  postRefreshToken,
  getAllDeals,
  getDeal,
  getDealStep,
  getDealHoldAmount,
  createDeal,
  deleteDeal,
  updateDeal,
  getHighlights,
  getSummary,
  getAllReviews,
  postCreditApp,
  dealAddDocument,
  dealDeleteDocument,
  inventorySoldStatus,
  estimateDeal,
  patchVerification,
  postVerification,
  getVerification,
  postNewVerifyDoc,
  deleteVerifyDoc,
  getDownloadUrl,
  getIterablePreferences,
  updateIterablePreferences,
  getCaf,
  getLXBankName,
  getVinDecode,
  getGradeCheck,
  postNotifyMe,
  postNotifyMeRegister,
  getVehicleAvailabilityV2,
  getAppraisalForDeal
};
