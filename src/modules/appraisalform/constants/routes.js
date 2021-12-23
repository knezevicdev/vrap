import { THEME_MODE, THEME_TYPE } from '../store/theme/types';

export const tda = '/texas-direct-auto';
/*
  Product requirement from Chase - they want a unique route that people can't guess
  UUID generated from https://www.uuidgenerator.net/version4
 */
const chaseUuid = 'abf4b1e0-20bf-460e-9675-b8056a00452d';

export const PATHS = {
  about: {
    prefix: '/about',
  },
  account: {
    prefix: '/account',
  },
  accountCreate: {
    prefix: '/account/create',
    withSlugs: '/account/create/:partner?',
    withParams: ({ partner }) => {
      let path = `/account/create/${partner}`;
      if (partner != null) {
        path += `/${partner}`;
      }
      return path;
    },
  },
  accountLogin: {
    prefix: '/account/login',
  },
  autofiScreen: {
    prefix: '/e2e/autofi',
    withSlugs: '/e2e/:vin/autofi',
    withParams: ({ vin }) => `/e2e/${vin}/autofi`,
  },
  myAccount: {
    prefix: '/my-account',
  },
  myAccountProfile: {
    prefix: '/my-account/profile',
  },
  myAccountFavorites: {
    prefix: '/my-account/favorites',
  },
  myAccountAddresses: {
    prefix: '/my-account/addresses',
  },
  myAccountTransactions: {
    prefix: '/my-account/transactions',
  },
  transactionDetails: {
    prefix: '/my-account/transactions/details',
    withSlugs: '/my-account/transactions/:deal/:status/details',
    withParams: ({ deal, status }) =>
      `/my-account/transactions/${deal}/${status}/details`,
  },
  transactionSummary: {
    prefix: '/my-account/transactions/summary',
    withSlugs: '/my-account/transactions/:deal/:status/summary',
    withParams: ({ deal, status }) =>
      `/my-account/transactions/${deal}/${status}/summary`,
  },
  viewOfferDetails: {
    prefix: '/my-account/transactions/offer',
    withSlugs: '/my-account/transactions/offer/:offerId?',
    withParams: ({ offerId }) => `/my-account/transactions/offer/${offerId}`,
  },
  careers: {
    prefix: '/careers',
  },
  careersPositions: {
    prefix: '/careers/positions',
  },
  careersGroup: {
    prefix: '/careers/category',
    withSlugs: '/careers/category/:group',
    withParams: ({ group }) => `/careers/category/${group}`,
  },
  careersPosition: {
    prefix: '/careers/positions',
    withSlugs: '/careers/positions/:id',
    withParams: ({ id }) => `/careers/positions/${id}`,
  },
  carNotAvailable: {
    prefix: '/errors/carnotavailable',
    withSlugs: '/errors/carnotavailable/:make/:model?',
    withParams: ({ make, model }) => {
      let path = `/errors/carnotavailable/${make}`;
      if (model != null) {
        path += `/${model}`;
      }
      return path;
    },
  },
  carNotFound: {
    prefix: '/errors/carnotfound',
  },
  cars: {
    prefix: '/cars',
  },
  catalog: {
    prefix: '/catalog',
    withSlugs: '/catalog/:year?/:make?/:body?',
    withParams: ({ year, make, body }) => {
      let path = '/catalog';
      if (year == null) {
        return path;
      }
      path += `/${year}`;
      if (make == null) {
        return path;
      }
      path += `/${make}`;
      if (body == null) {
        return path;
      }
      path += `/${body}`;
      return path;
    },
  },
  chaseLanding: {
    prefix: `/chase_${chaseUuid}`,
  },
  chaseTerms: {
    prefix: `/chase_${chaseUuid}/terms-and-conditions`,
  },

  // TODO: congratulations and creditCongratulations can possibly be combined,
  // depending on the desired implementation of the
  // /pages/Credit/components/Congratulations component.
  // At the time of writing, these routes accomplish the same thing.
  congratulations: {
    prefix: '/congratulations',
    withSlugs: '/congratulations/:vin?',
    withParams: ({ vin }) => {
      let path = '/congratulations';
      if (vin != null) {
        path += `/${vin}`;
      }
      return path;
    },
  },
  contact: {
    prefix: '/contact',
  },
  credit: {
    prefix: '/credit',
    withSlugs: '/credit/:vin?',
    withParams: ({ vin }) => {
      let path = '/credit';
      if (vin != null) {
        path += `/${vin}`;
      }
      return path;
    },
  },
  creditApplication: {
    prefix: '/credit-application',
    withSlugs: '/credit-application/:vin?',
    withParams: ({ vin }) => {
      let path = '/credit-application';
      if (vin != null) {
        path += `/${vin}`;
      }
      return path;
    },
  },
  creditComplete: {
    prefix: '/credit/complete',
  },
  creditCongratulations: {
    prefix: '/congratulations/credit',
    withSlugs: '/congratulations/credit/:vin?',
    withParams: ({ vin }) => {
      let path = '/congratulations/credit';
      if (vin != null) {
        path += `/${vin}`;
      }
      return path;
    },
  },
  creditReview: {
    prefix: '/credit/review',
    withSlugs: '/credit/review/:vin?',
    withParams: ({ vin }) => {
      let path = '/credit/review';
      if (vin != null) {
        path += `/${vin}`;
      }
      return path;
    },
  },
  ebay: {
    prefix: '/ebay',
  },
  finance: {
    prefix: '/finance',
  },
  forgetPassword: {
    prefix: '/forgot-password',
  },
  home: {
    prefix: '/',
  },
  howItWorks: {
    prefix: '/how-it-works',
  },
  inventory: {
    prefix: '/inventory',
    withSlugs: '/inventory/:vehicle',
    withParams: ({ vehicle }) => `/inventory/${vehicle}`,
  },
  legal: {
    prefix: '/legal',
  },
  legalTermsOfUse: {
    prefix: '/legal/terms-of-use',
  },
  legalPrivacyPolicy: {
    prefix: '/legal/privacy-policy',
  },
  legalFinancialPrivacyPolicy: {
    prefix: '/legal/financial-privacy-policy',
  },
  legalESign: {
    prefix: '/legal/e-sign',
  },
  location: {
    prefix: '/locations',
    withSlugs:
      '/locations/:location(clear-lake|cypress|galleria|katy|kingwood|memorial|stafford|woodlands)',
    withParams: ({ location }) => `/locations/${location}`,
  },
  deal: {
    prefix: '/e2e',
    withSlugs: '/e2e/:vin',
    withParams: ({ vin }) => `/e2e/${vin}`,
  },
  deliveryAddress: {
    prefix: '/e2e/delivery',
    withSlugs: '/e2e/:vin/delivery/:type?',
    withParams: ({ vin, type }) => {
      let path = `/e2e/${vin}/delivery`;
      if (type != null) {
        path += `/${type}`;
      }
      return path;
    },
  },
  deliveryAddressForm: {
    prefix: '/e2e/delivery-form',
    withSlugs: '/e2e/:vin/delivery-form',
    withParams: ({ vin }) => `/e2e/${vin}/delivery-form`,
  },
  depositForm: {
    prefix: '/e2e/deposit-form',
    withSlugs: '/e2e/:vin/deposit-form',
    withParams: ({ vin }) => `/e2e/${vin}/deposit-form`,
  },
  paymentOptions: {
    prefix: '/checkout/payment-options',
    withSlugs: '/checkout/payment-options?vin=:vin',
    withParams: ({ vin }) => `/checkout/payment-options?vin=${vin}`,
  },
  dealCredit: {
    prefix: '/e2e/vroomFinancing',
    withSlugs: '/e2e/:vin/vroomFinancing',
    withParams: ({ vin }) => `/e2e/${vin}/vroomFinancing`,
  },
  dealCreditComplete: {
    prefix: '/checkout/credit/complete',
  },
  dealCreditReview: {
    prefix: '/e2e/credit/review',
    withSlugs: '/e2e/:vin/credit/review',
    withParams: ({ vin }) => `/e2e/${vin}/credit/review`,
  },
  dealCongratulations: {
    prefix: '/checkout/congratulations',
  },
  vehicleTradeIn: {
    prefix: '/checkout/vehicleTradeIn',
    withSlugs: '/checkout/:vin/vehicleTradeIn',
    withParams: ({ vin }) => `/checkout/${vin}/vehicleTradeIn`,
  },
  dealReview: {
    prefix: '/e2e/dealReview',
    withSlugs: '/e2e/:vin/dealReview',
    withParams: ({ vin }) => `/e2e/${vin}/dealReview`,
  },
  protection: {
    prefix: '/protection',
  },
  registrationAddress: {
    prefix: '/e2e/registration',
    withSlugs: '/e2e/:vin/registration',
    withParams: ({ vin }) => `/e2e/${vin}/registration`,
  },
  checkoutTradeIn: {
    prefix: '/e2e/checkoutTradeIn',
    withSlugs: '/e2e/:vin/checkoutTradeIn',
    withParams: ({ vin }) => `/e2e/${vin}/checkoutTradeIn`,
  },
  tradeInLoanInfo: {
    prefix: '/e2e/tradeInLoanInfo',
    withSlugs: '/e2e/:vin/tradeInLoanInfo',
    withParams: ({ vin }) => `/e2e/${vin}/tradeInLoanInfo`,
  },

  tradeinAutoLoan: {
    prefix: '/checkout/trade-in-auto-loan',
    withSlugs: '/checkout/trade-in-auto-loan?vin=:vin',
    withParams: ({ vin }) => `/checkout/trade-in-auto-loan?vin=${vin}`,
  },

  dealSelectionScreen: {
    prefix: '/checkout/vehicle-switch',
    withSlugs: '/checkout/:vin/vehicle-switch',
    withParams: ({ vin }) => `/checkout/${vin}/vehicle-switch`,
  },
  oldDealSelectionScreen: {
    prefix: 'e2e/dealSelectionScreen',
    withSlugs: '/e2e/:vin/dealSelectionScreen',
    withParams: ({ vin }) => `/e2e/${vin}/dealSelectionScreen`,
  },
  startPurchase: {
    prefix: '/checkout/purchase',
  },
  dealCoverage: {
    prefix: '/checkout/add-on-products',
    withSlugs: '/checkout/add-on-products?vin=:vin',
    withParams: ({ vin }) => `/checkout/add-on-products?vin=${vin}`,
  },
  oldDealCoverage: {
    prefix: 'e2e/dealCoverage',
    withSlugs: '/e2e/:vin/dealCoverage',
    withParams: ({ vin }) => `/e2e/${vin}/dealCoverage`,
  },
  documentUpload: {
    prefix: '/checkout/document-upload',
    withSlugs: '/checkout/document-upload?vin=:vin',
    withParams: ({ vin }) => `/checkout/document-upload?vin=${vin}`,
  },
  selectTradeIn: {
    prefix: '/checkout/select-trade-in',
    withSlugs: '/checkout/select-trade-in?vin=:vin',
    withParams: ({ vin }) => `/checkout/select-trade-in?vin=${vin}`,
  },
  contracting: {
    prefix: '/checkout/contracts',
    withSlugs: '/checkout/:vin/contracts',
    withParams: ({ vin }) => `/checkout/${vin}/contracts`,
  },
  resetPassword: {
    prefix: '/confirmPassword',
  },
  unsubscribe: {
    prefix: '/unsubscribe',
  },
  reviews: {
    prefix: '/reviews',
  },
  sell: {
    prefix: '/sell',
  },
  sellAppraisal: {
    prefix: '/sell/vehicleInformation',
    withSlugs: '/sell/vehicleInformation/:vin?',
    withParams: ({ vin }) => `/sell/vehicleInformation/${vin}`,
  },
  sellAppraisalComplete: {
    prefix: '/sell/appraisal/complete',
  },
  // TODO: remove "sellCongrats" when we are confident with the new complete page.
  sellCongrats: {
    prefix: '/sell/congrats',
  },
  sellOffer: {
    prefix: '/sell/offer',
  },
  sellOfferCongrats: {
    prefix: '/sell/verification-congrats',
  },
  sellVerification: {
    prefix: '/sell/verification',
  },
  sellOwner: {
    prefix: '/sell/verification/owner',
    withSlugs: '/sell/verification/owner/:offerId',
    withParams: ({ offerId }) => `/sell/verification/owner/${offerId}`,
  },
  sellDocuments: {
    prefix: '/sell/verification/documents',
    withSlugs: `/sell/verification/documents/:offerId`,
    withParams: ({ offerId }) => `/sell/verification/documents/${offerId}`,
  },
  sellVerificationReview: {
    prefix: '/sell/verification/review',
  },
  portedVerificationReivew: {
    withParams: (offerId) =>
      `/appraisal/verification/review?priceId=${offerId}`,
  },
  sellPaymentMethod: {
    withParams: (offerId) => `/appraisal/paymentmethod?priceId=${offerId}`,
  },
  sellVerificationReviewPriceId: {
    withParams: ({ priceId }) =>
      `/appraisal/verification/review?priceId=${priceId}`,
  },
  sellReview: {
    prefix: '/sell/review',
  },
  trade: {
    prefix: '/trade',
  },
  tradeAppraisal: {
    prefix: '/trade/vehicleInformation',
    withSlugs: '/trade/vehicleInformation/:vin?',
    withParams: ({ vin }) => `/trade/vehicleInformation/${vin}`,
  },
  checkoutTradeAppraisal: {
    prefix: '/tradeIn-selfService',
    withSlugs: '/tradeIn-selfService/:vin?',
    withParams: ({ vin }) => `/tradeIn-selfService/${vin}`,
  },
  checkoutTradeReview: {
    prefix: '/tradeIn-selfService-Review',
  },
  tradeAppraisalComplete: {
    prefix: '/trade/appraisal/complete',
  },
  // TODO: remove "tradeCongrats" when we are confident with the new complete page.
  tradeCongrats: {
    prefix: '/trade/congrats',
  },
  tradeOffer: {
    prefix: '/trade/offer',
  },
  tradeReview: {
    prefix: '/trade/review',
  },
  tda: {
    prefix: '/tda',
    withSlugs: '/tda/:year?/:make?/:body?',
    withParams: ({ year, make, body }) => {
      let path = '/tda';
      if (year == null) {
        return path;
      }
      path += `/${year}`;
      if (make == null) {
        return path;
      }
      path += `/${make}`;
      if (body == null) {
        return path;
      }
      path += `/${body}`;
      return path;
    },
  },
  updatePhoneNumber: {
    prefix: '/update-phone-number',
  },
  tdaLocations: {
    prefix: `${tda}/locations`,
  },
  tdaSell: {
    prefix: `${tda}/sell`,
  },
  tdaSellAppraisal: {
    prefix: `${tda}/sell/vehicleInformation`,
    withSlugs: `${tda}/sell/vehicleInformation/:vin?`,
    withParams: ({ vin }) => `${tda}/sell/vehicleInformation/${vin}`,
  },
  tdaSellAppraisalComplete: {
    prefix: `${tda}/sell/appraisal/complete`,
  },
  // TODO: remove "sellCongrats" when we are confident with the new complete page.
  tdaSellCongrats: {
    prefix: `${tda}/sell/congrats`,
  },
  tdaSellOffer: {
    prefix: `${tda}/sell/offer`,
  },
  tdaSellReview: {
    prefix: `${tda}/sell/review`,
  },
  vroomCoverage: {
    prefix: '/vroomcoverage',
  },
  walkIn: {
    prefix: '/walk-in',
  },
  componentsMultiForm: {
    prefix: '/multiformComponent',
  },
  componentsMultiTab: {
    prefix: '/multiTabComponent',
  },
};

// Should this live here? We may consider making a separate file for query params
// if we like this approach, and want to add to it.
export const QueryParam = {
  APPOINTMENT: 'appointment',
  MODE: 'mode',
};

export const QueryParamValue = {
  Mode: {
    KIOSK: 'kiosk',
  },
};

const getThemePrefix = (theme) => {
  switch (theme) {
    case THEME_TYPE.TDA: {
      return tda;
    }

    default:
      return '';
  }
};

export const getModeParam = (mode) => {
  switch (mode) {
    case THEME_MODE.KIOSK: {
      return `${QueryParam.MODE}=${QueryParamValue.Mode.KIOSK}`;
    }

    default:
      return '';
  }
};

export const getThemedPath = (path, theme = THEME_TYPE.VROOM) => {
  return `${getThemePrefix(theme)}${path}`;
};
