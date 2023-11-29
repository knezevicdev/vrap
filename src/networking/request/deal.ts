import { GQLTypes, isErrorResponse, Response } from '@vroom-web/networking';
import {
  ApiError,
  MutationDealV3UpdateDealArgs,
} from '@vroom-web/networking/dist/generated/graphql-types';
import { get as _get } from 'lodash';

import DEAL_ADD_TRADE_INS from '../../graphql/mutations/dealAddTradeIns.graphql';
import UPDATE_DEAL from '../../graphql/mutations/updateDeal.graphql';
import GET_USER_DEAL from '../../graphql/queries/getUserDeal.graphql';
import client from '../client';

const getResumeStep = (nextStep: string, vin: string): string | undefined => {
  switch (nextStep) {
    case 'SelectTradeIn':
      return `/checkout/select-trade-in?vin=${vin}`;
    case 'TradeInLoanInfo':
      return `/checkout/trade-in-auto-loan?vin=${vin}`;
    case 'Address':
      return `/checkout/address?vin=${vin}`;
    case 'DeliveryDetails':
      return `/checkout/delivery-details?vin=${vin}`;
    case 'Financing':
      return `/checkout/vroom-financing?vin=${vin}`;
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

  return '/checkout/resume';
};

export const getInProgressDeal = async (): Promise<GQLTypes.DealV3> => {
  const res = await client.gearboxRequest<
    { user: GQLTypes.User },
    GQLTypes.UserDealsV3Args
  >({
    document: GET_USER_DEAL,
    variables: {
      dealStatus: ['In-Progress'],
    },
  });

  const deal = _get(res, 'data.user.dealsV3.0');
  if (!isErrorResponse(res) && deal) {
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
  res: Response<Record<string, GQLTypes.DealV3>>,
  key: string
): UpdateDeal => {
  if (!isErrorResponse(res)) {
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
      (res as unknown as { data: Record<string, ApiError> })?.data?.[key]
        ?.errorDetail ||
      'Oops! Something went wrong. Please try again or give us a call at (855) 524-1300 to reserve this vehicle',
  };
};

export const acceptDeal = async (
  payload: GQLTypes.MutationDealV3PutTradeInArgs
): Promise<UpdateDeal> => {
  const {
    externalDealID,
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
  const res = await client.gearboxRequest<
    Record<string, GQLTypes.DealV3>,
    GQLTypes.MutationDealV3PutTradeInArgs
  >({
    document: DEAL_ADD_TRADE_INS,
    variables: {
      externalDealID,
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

  return handleUpdateDealResponse(res, 'dealV3PutTradeIn');
};

export const declineDeal = async (
  deal: GQLTypes.DealV3
): Promise<UpdateDeal> => {
  const res = await client.gearboxRequest<
    Record<string, GQLTypes.DealV3>,
    MutationDealV3UpdateDealArgs
  >({
    document: UPDATE_DEAL,
    variables: {
      updateRequest: {
        externalDealID: deal.externalDealID,
        source: 'web',
        tradeInStepDone: true,
        interestedInTrade: true,
      },
    },
  });

  return handleUpdateDealResponse(res, 'dealV3UpdateDeal');
};
