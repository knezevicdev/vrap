import {
  ErrorResponse,
  isAccessDeniedErrorResponse,
  isErrorResponse,
  isSuccessResponse,
} from '@vroom-web/networking';
import get from 'lodash/get';
import head from 'lodash/head';
import { AppContext, AppInitialProps } from 'next/app';
import App from 'next/app';
import getConfig from 'next/config';
import { Router } from 'next/router';

import { getDealValidator } from 'src/networking';
import { getTestDealSSR } from 'src/networking/util/getTestDeal';
export interface DealValidatorProps extends AppInitialProps {
  isAuthenticated: boolean;
  isVehicleSold: boolean;
  hasPendingDeal: boolean;
  hasInProgressDeal: boolean;
  isDepositCaptured: boolean;
}

export enum DealStatusEnum {
  IN_PROGRESS = 'In-Progress',
  PENDING = 'Pending',
  CANCEL = 'Cancel',
}

export enum DealStepsEnum {
  TRADE = 'TradeInLoanInfo',
  REGISTRATION = 'RegistrationAddress',
  DELIVERY = 'DeliveryAddress',
  PAYMENT = 'PaymentType',
  FINANCING = 'Financing',
  FINANCING_PENDING = 'FinancingPending',
  FINANCING_OPTION = 'FinancingOption',
  FINANCING_DECLINED = 'FinancingDeclined',
  PRODUCTS = 'BackendProducts',
  DEPOSIT = 'DepositPaymentInfo',
  DOCUMENT_UPLOAD = 'DocumentUpload',
  DEAL_SUMMARY = 'DealSummary',
}

type StepPagesMappingData = {
  [key: string]: string;
};

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

/**
 * Checkout url conformed by checkout/[vin]/page
 * @param vin
 * @param to
 */
export const buildUrl = (vin: string, to: string): string =>
  `${BASE_PATH}/${vin}/${to}`;

/**
 * Rules should not be applied to pages like upload documents and congratulations
 * @param router
 */
export const excludePage = (router: Router): boolean => {
  const excludeListOfPages = ['congratulations', 'documentUpload'];

  for (const page of excludeListOfPages) {
    if (router.route.indexOf(page) > -1) {
      return true;
    }
  }

  return false;
};

export const stepPagesMapping = (vin: string): StepPagesMappingData =>
  ({
    [DealStepsEnum.TRADE]: buildUrl(vin, 'tradeIn'),
    [DealStepsEnum.REGISTRATION]: buildUrl(vin, 'registration'),
    [DealStepsEnum.DELIVERY]: buildUrl(vin, 'testPage'),
    [DealStepsEnum.PAYMENT]: buildUrl(vin, 'testPage'),
    [DealStepsEnum.FINANCING]: buildUrl(vin, 'testPage'),
    [DealStepsEnum.FINANCING_PENDING]: buildUrl(vin, 'testPage'),
    [DealStepsEnum.FINANCING_OPTION]: buildUrl(vin, 'testPage'),
    [DealStepsEnum.FINANCING_DECLINED]: buildUrl(vin, 'testPage'),
    [DealStepsEnum.PRODUCTS]: buildUrl(vin, 'testPage'),
    [DealStepsEnum.DEPOSIT]: buildUrl(vin, 'testPage'),
    [DealStepsEnum.DOCUMENT_UPLOAD]: buildUrl(vin, 'testPage'),
    [DealStepsEnum.DEAL_SUMMARY]: `${BASE_PATH}/congratulations`,
  } as StepPagesMappingData);

/**
 * Initial Deal validations
 * @param AppContext
 */
export const initDealValidator = async (
  appContext: AppContext
): Promise<DealValidatorProps> => { 
  const { router, ctx } = appContext;
  const vin = get(router, 'query.vin');

  const headers: Record<string, string> | undefined = ctx.req
    ? { cookie: ctx.req.headers.cookie || '' }
    : undefined;

  const { dealID } = getTestDealSSR(router); //select Test Deal ID from the parameters on dev.

  const response = await getDealValidator(vin, headers, dealID);

  const isErrorResponded = isErrorResponse(response);
 
  //Check Authorization
  let isAuth = !(
    isErrorResponded && isAccessDeniedErrorResponse(response as ErrorResponse)
  );
 
  const appProps = await App.getInitialProps(appContext);

  //Don't apply any rule if the current path is on the excluded list
  if (excludePage(router)) {
    return {
      ...appProps,
      isAuthenticated: isAuth,
      isVehicleSold: false,
      hasPendingDeal: false,
      hasInProgressDeal: false,
      isDepositCaptured: false,
    };
  }


  if (isSuccessResponse(response)) {
    //Check if the Vehicle has being sold
    const isVehicleSold =
      head(response.data.invSearch.vehicles)?.soldStatus !== 0;

    //does it has pending deal
    const hasPendingDeal = response.data.user.deals?.find(
      (f) => f.dealSummary.dealStatus.status === DealStatusEnum.PENDING
    );
    const hasInProgressDeal = response.data.user.deals?.find(
      (f) => f.dealSummary.dealStatus.status === DealStatusEnum.IN_PROGRESS
    );
    //don't show the modal if the deposit is captured and the page is uploadDocument.
    const isDepositCapturedPending = !!hasPendingDeal?.dealSummary
      .depositPaymentInfo?.DepositCaptured;
    const isDepositCapturedInProgress = !!hasInProgressDeal?.dealSummary
      .depositPaymentInfo?.DepositCaptured;
    return {
      ...appProps,
      isAuthenticated: isAuth,
      isVehicleSold,
      hasPendingDeal: !!hasPendingDeal,
      hasInProgressDeal: !!hasInProgressDeal,
      isDepositCaptured:
        isDepositCapturedPending || isDepositCapturedInProgress,
    };
  } else {
    //Is there some error related with the graphQL update auth flag
    isAuth = false;
  }

  return {
    ...appProps,
    isAuthenticated: isAuth,
    isVehicleSold: false,
    hasPendingDeal: false,
    hasInProgressDeal: false,
    isDepositCaptured: false,
  };
};
