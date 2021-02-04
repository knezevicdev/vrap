import { AppContext } from 'next/app'
import { getPurchaseValidator, DealValidatorData } from "src/networking";
import get from "lodash/get"; 
import last from "lodash/last";
import head from "lodash/head";
import { Response, isErrorResponse } from '@vroom-web/networking';
import getConfig from "next/config";
import { Router } from 'next/router';

interface DealValidatorProps {
    isAuthenticated: boolean,
    isVehicleSold: boolean,
    hasPendingDeal: boolean,
    hasInprogressDeal: boolean,
    isDepositCaptured: boolean
}

export enum DealStatusEnum  {
    IN_PROGRESS = "In-Progress",
    PENDING = "In-Progress",
    CANCEL = "cancel"
}

export enum DealStepsEnum {
    TRADE = "TradeInLoanInfo",
    REGISTRATION = "RegistrationAddress",
    DELIVERY = "DeliveryAddress",
    PAYMENT = "PaymentType",
    FINANCING = "Financing",
    FINANCING_PENDING = "FinancingPending",
    FINANCING_OPTION = "FinancingOption",
    FINANCING_DECLINED = "FinancingDeclined",
    PRODUCTS = "BackendProducts",
    DEPOSIT = "DepositPaymentInfo",
    DOCUMENT_UPLOAD = "DocumentUpload",
    DEAL_SUMMARY = "DealSummary"
}
 
type StepMappingData = {
     [key: string]: string
}
 
const { publicRuntimeConfig: {BASE_PATH} } = getConfig();

console.log("basePath", BASE_PATH)
const buildUrl = (vin: string, to: string) => (`${BASE_PATH}/${vin}/${to}`);

export const stepMapping = (vin: string) => ({
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
    [DealStepsEnum.DEAL_SUMMARY]: `congratulations`,
} as StepMappingData)

const getCurrentPageName = (router: Router): string | undefined => last(router.pathname && router.pathname.split('/'))
/**
 * Initial Deal validations 
 * @param AppContext 
 */
export const initDealValidator = async({router, ctx}: AppContext ) => {
  console.log(router)
     
    const vin = get(router, 'query.vin');
     let response = await getPurchaseValidator(vin);  //test vin: JTDKARFU6K3085481
       
     const isAuth = isAuthenticated(response);

     if (!isErrorResponse(response)) { 
        
        //Vehicle sold
        const isVehicleSold = head(response.data.invSearch.vehicles)?.soldStatus !== 0;

        //does it has pending deal
        const hasPendingDeal = !!response.data.user.deals?.find(f => f.dealSummary.dealStatus.status === DealStatusEnum.PENDING)
        const hasInProgressDeal = response.data.user.deals?.find(f => f.dealSummary.dealStatus.status === DealStatusEnum.IN_PROGRESS)
        
        const isDepositCaptured = hasInProgressDeal?.dealSummary.depositPaymentInfo?.DepositCaptured

        //If the deal in progress captured the deposit send the user to myAccount
        if(hasInProgressDeal && isDepositCaptured){
            if(ctx.res){ 
                ctx.res.writeHead(302, {Location: `${BASE_PATH}/my-account/transactions/`})
                ctx.res.end();
            }
            return;
        }

        //Id the user has a eal in progress send the user the last step in progress
        if(hasInProgressDeal){
            const currentStep = hasInProgressDeal.dealSummary.dealStatus.step;
            //Send the user to the current Step
            const currentUrl = `${BASE_PATH}${router.asPath}`;
            const currentStepUrl = stepMapping(vin)[currentStep]
            //make sure only to redirect if the current step and current url are different
            if(ctx.res && currentStepUrl != currentUrl && vin){
                ctx.res.writeHead(302, {Location: currentStepUrl})
                ctx.res.end();
            }
        }

        return { isAuthenticated: isAuth, isVehicleSold, hasPendingDeal,  hasInProgressDeal: !!hasInProgressDeal, isDepositCaptured }
     }
 
    return { isAuthenticated: isAuth, isVehicleSold: false, hasPendingDeal: false, hasInProgressDeal: false  }
  }

  /**
   * Validate Authorization
   * @param response 
   */
  export const isAuthenticated = (response: Response<DealValidatorData>) => {
      
    const errorCode = get(response, 'error.response.extensions.error_code');
    if(errorCode && errorCode === 401){
        //Not Authorized
        return false;
    }

    return true;
  }