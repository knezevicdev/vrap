import { isSuccessResponse } from '@vroom-web/networking';
import { get as _get } from 'lodash';
const { publicRuntimeConfig } = getConfig();

import getConfig from 'next/config';

import AnalyticsHandler from '../../integrations/AnalyticsHandler';
import client from '../client';
import { Deal, DealTradePayload } from '../models/Deal';
import { getUTMParams } from '../utils';

const NEXT_PUBLIC_INTERCHANGE_URL =
  publicRuntimeConfig.NEXT_PUBLIC_INTERCHANGE_URL;

const analyticsHandler = new AnalyticsHandler();

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

const getErrorMessage = (response: unknown): string => {
  const errorMessage = _get(
    response,
    'error.response.data.error.details.0.message'
  );
  switch (errorMessage) {
    case 'deal version number is out of sync':
      analyticsHandler.track('Transaction Has New Updates Error', {
        category: 'Ecommerce',
        label: 'Transaction Has New Updates Error',
      });
      return 'Your changes were unable to be saved because your transaction has new updates. Please try submitting again.';
    case 'cannot update MA deal':
      return 'Thank you for your interest in buying a car from Vroom. Unfortunately, due to state regulations, Vroom does not sell vehicles to customers residing in Massachusetts (MA) at this time.';
    case 'trying to update a deal status to in-progress from status Pending is not allowed':
      return 'You are currently in the process of purchasing another vehicle. Once that purchase is complete, you’ll be able to make another purchase.';
    default:
      return 'Oops! Something went wrong. Please try again or give us a call at (855) 524-1300 to reserve this vehicle';
  }
};

export const getInProgressDeal = async (): Promise<Deal> => {
  const response = await client.httpRequest<{ data: Deal[] }>({
    url: `${NEXT_PUBLIC_INTERCHANGE_URL}/api/deal/my-deals`,
    method: 'GET',
  });

  if (isSuccessResponse(response)) {
    const deal = response.data.data.find(
      (deal) => deal.summary.dealStatus.status === 'In-Progress'
    );

    if (deal) return deal;
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

const updateDeal = async (deal: Deal): Promise<UpdateDeal> => {
  const attribution = {
    brand: 'Vroom',
    segment_user_id:
      window && window.analytics && window.analytics.user
        ? window.analytics.user().anonymousId()
        : '',
    site: (window && window.location && window.location.hostname) || '',
    type: 'Website',
    ...getUTMParams(),
  };

  const response = await client.httpRequest<{ data: Deal }>({
    url: `${NEXT_PUBLIC_INTERCHANGE_URL}/api/deal/my-deals/update`,
    method: 'PUT',
    data: {
      ...deal,
      attribution,
    },
    headers: {
      'supported-steps':
        'SelectTradeIn,TradeInVehicle,TradeInLoanInfo,Address,PaymentType,Financing,FinancingPending,FinancingOption,FinancingDeclined,BackendProducts,DepositPaymentInfo,DocumentUpload,Contracting,DealSummary',
    },
  });

  if (isSuccessResponse(response)) {
    const redirect = getResumeStep(
      response.data.data.summary.dealStatus.step,
      deal.vin
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
    error: getErrorMessage(response),
  };
};

export const acceptDeal = async (
  deal: Deal,
  dealTradePayload: DealTradePayload
): Promise<UpdateDeal> => {
  return updateDeal({
    ...deal,
    deal_trades: [
      {
        payload: dealTradePayload,
      },
    ],
  });
};

export const declineDeal = async (deal: Deal): Promise<UpdateDeal> => {
  return updateDeal({
    ...deal,
    summary: {
      ...deal.summary,
      dealStatus: {
        ...deal.summary.dealStatus,
        tradeInStepDone: true,
      },
    },
  });
};
