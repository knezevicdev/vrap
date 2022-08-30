import { GQLTypes, isSuccessResponse, Response } from '@vroom-web/networking';
import {
  ApiError,
  MutationDealAddStatusArgs,
} from '@vroom-web/networking/dist/generated/graphql-types';
import { get as _get } from 'lodash';

import DEAL_ADD_TRADE_INS from '../../graphql/mutations/dealAddTradeIns.graphql';
import UPDATE_DEAL_STATUS from '../../graphql/mutations/updateDealStatus.graphql';
import GET_USER_DEAL from '../../graphql/queries/getUserDeal.graphql';
import client from '../client';

const getResumeStep = (nextStep: string, vin: string): string | undefined => {
  switch (nextStep) {
    case 'TradeIn':
      return `/e2e/${vin}/checkoutTradeIn`;
    case 'SelectTradeIn':
      return `/checkout/select-trade-in?vin=${vin}`;
    case 'TradeInLoanInfo':
      return `/checkout/trade-in-auto-loan?vin=${vin}`;
    case 'Address':
      return `/checkout/address?vin=${vin}`;
    case 'DeliveryDetails':
      return `/checkout/delivery-details?vin=${vin}`;
    case 'Financing':
      return `/e2e/${vin}/vroomFinancing`;
    case 'PaymentType':
      return `/checkout/payment-options?vin=${vin}`;
    case 'DepositPaymentInfo':
      return `/checkout/deposit-form?vin=${vin}`;
    case 'DealSummary':
      return '/checkout/congratulations';
    case 'FinancingOption':
      return `/checkout/vroom-financing-offers?vin=${vin}`;
    case 'FinancingPending':
      return `/checkout/vroom-financing-offers?vin=${vin}`;
    case 'BackendProducts':
      return `/checkout/add-on-products?vin=${vin}`;
    case 'DealReview':
      return `/checkout/deal-review?vin=${vin}`;
    case 'DocumentUpload':
      return `/checkout/document-upload?vin=${vin}`;
    case 'Contracting':
      return `/checkout/${vin}/contracts`;
    case 'TradeInVehicle':
      return `/checkout/${vin}/vehicleTradeIn`;
  }
};

export const getInProgressDeal = async (): Promise<GQLTypes.Deal> => {
  const res = await client.gqlRequest<
    { user: GQLTypes.User },
    GQLTypes.UserDealsArgs
  >({
    document: GET_USER_DEAL,
    variables: {
      dealStatus: ['In-Progress'],
    },
  });

  const deal = _get(res, 'data.user.deals.0');
  if (isSuccessResponse(res) && deal) {
    return deal;
  }

  throw new Error('Deal not found');
};

type UpdateDealResponse = {
  isError: false;
  redirect: string;
};

type UpdateDealError = {
  isError: true;
  error: string;
};

export type UpdateDeal = UpdateDealResponse | UpdateDealError;

const handleUpdateDealResponse = (
  res: Response<Record<string, GQLTypes.Deal>>,
  key: string
): UpdateDeal => {
  if (isSuccessResponse(res)) {
    const redirect = getResumeStep(
      res.data[key].dealSummary.dealStatus.step,
      res.data[key].dealSummary.inventory?.vehicle?.vin || ''
    );

    if (redirect) {
      return {
        isError: false,
        redirect,
      };
    }
  }

  return {
    isError: true,
    error:
      ((res as unknown) as { data: Record<string, ApiError> })?.data?.[key]
        ?.errorDetail ||
      'Oops! Something went wrong. Please try again or give us a call at (855) 524-1300 to reserve this vehicle',
  };
};

export const acceptDeal = async (
  payload: GQLTypes.MutationDealPutTradeInArgs
): Promise<UpdateDeal> => {
  const {
    dealID,
    appraisalID,
    offerID,
    offerPrice,
    vin,
    make,
    carModel,
    year,
    email,
    offerStatus,
    expirationDate,
    source,
  } = payload;
  const res = await client.gqlRequest<
    Record<string, GQLTypes.Deal>,
    GQLTypes.MutationDealPutTradeInArgs
  >({
    document: DEAL_ADD_TRADE_INS,
    variables: {
      dealID,
      source,
      appraisalID,
      offerID,
      offerPrice,
      vin,
      make,
      carModel,
      year,
      email,
      offerStatus,
      expirationDate,
    },
  });

  return handleUpdateDealResponse(res, 'dealPutTradeIn');
};

export const declineDeal = async (deal: GQLTypes.Deal): Promise<UpdateDeal> => {
  const res = await client.gqlRequest<
    Record<string, GQLTypes.Deal>,
    MutationDealAddStatusArgs
  >({
    document: UPDATE_DEAL_STATUS,
    variables: {
      dealID: deal.dealID,
      source: 'web',
      tradeInStepDone: true,
    },
  });

  return handleUpdateDealResponse(res, 'dealAddStatus');
};
