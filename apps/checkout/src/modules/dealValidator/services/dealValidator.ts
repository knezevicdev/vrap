import {
  ErrorResponse,
  GQLTypes,
  isAccessDeniedErrorResponse,
  isErrorResponse,
  isSuccessResponse,
} from '@vroom-web/networking';
import get from 'lodash/get';
import head from 'lodash/head';
import { Router, SingletonRouter } from 'next/router';

import SpecialPageRules from './data/specialPageRules.json';

import { getDealValidator } from 'src/networking';
import { getTestDeal } from 'src/networking/util/getTestDeal';
export interface DealValidatorProps {
  isAuthenticated: boolean;
  isVehicleSold: boolean;
  hasPendingDeal: boolean;
  hasInProgressDeal: boolean;
  isDepositCaptured: boolean;
  vehicleInfo?: GQLTypes.VehicleInventory | null;
}

export enum DealStatusEnum {
  IN_PROGRESS = 'In-Progress',
  PENDING = 'Pending',
  CANCEL = 'Cancel',
}

interface Rules {
  vehicleSold: boolean;
  depositCaptured: boolean;
  pendingDeal: boolean;
  inProgressDeal: boolean;
}
/**
 * Rules should not be applied to pages like upload documents and congratulations
 * @param router
 */
export const excludePage = (router: Router | null): Rules | null => {
  const excludeListOfPages = SpecialPageRules;

  for (const page of excludeListOfPages) {
    if (router && router.route && router.route.indexOf(page.path) > -1) {
      return page.rules;
    }
  }
  return null;
};

/**
 * Initial Deal validations
 * @param AppContext
 */
export const initDealValidator = async (
  Router: SingletonRouter
): Promise<DealValidatorProps> => {
  let isAuth = false;

  try {
    console.log("Stating Deal Validation Logic")
    const { router } = Router;

    const vin = get(router, 'query.vin');

    const { dealID } = getTestDeal(); //select Test Deal ID from the parameters on dev.

    console.log("Deal Validation Parameters", router, vin)

    const response = await getDealValidator(vin, dealID);
    console.log("Deal Validator Responses", JSON.stringify(response))
    const isErrorResponded = isErrorResponse(response);

    //Check Authorization
    isAuth = !(
      isErrorResponded && isAccessDeniedErrorResponse(response as ErrorResponse)
    );

    if (isSuccessResponse(response)) {
      const excludedRules = excludePage(router);

      //Check if the Vehicle has being sold
      const isVehicleSold =
        get(response.data.invSearch, 'vehicles[0].soldStatus') !== 0;

      //does it has pending deal
      const hasPendingDeal =
        response.data.user &&
        response.data.user.deals?.find(
          (f) => f.dealSummary.dealStatus.status === DealStatusEnum.PENDING
        );
      const hasInProgressDeal =
        response.data.user &&
        response.data.user.deals?.find(
          (f) => f.dealSummary.dealStatus.status === DealStatusEnum.IN_PROGRESS
        );

      const isDepositCapturedInProgress = !!hasInProgressDeal?.dealSummary
        .depositPaymentInfo?.DepositCaptured;

      const firstDeal = head(response.data.user.deals);

      const vehicleInfo = firstDeal && firstDeal.dealSummary.inventory?.vehicle;

      return {
        isAuthenticated: isAuth,
        isVehicleSold: excludedRules
          ? excludedRules.vehicleSold && isVehicleSold
          : isVehicleSold,
        hasPendingDeal: excludedRules
          ? excludedRules.pendingDeal && !!hasPendingDeal
          : !!hasPendingDeal,
        hasInProgressDeal: excludedRules
          ? excludedRules.inProgressDeal && !!hasInProgressDeal
          : !!hasInProgressDeal,
        isDepositCaptured: excludedRules
          ? excludedRules.depositCaptured && isDepositCapturedInProgress
          : isDepositCapturedInProgress,
        vehicleInfo,
      };
    } else {
      //Is there some error related with the graphQL update auth flag
      isAuth = false;
    }
  } catch (error) {
    console.error(JSON.stringify(error));
  }

  return {
    isAuthenticated: isAuth,
    isVehicleSold: false,
    hasPendingDeal: false,
    hasInProgressDeal: false,
    isDepositCaptured: false,
  };
};
