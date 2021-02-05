import { AppContext, AppInitialProps } from 'next/app'
import { getPurchaseValidator, DealValidatorData } from "src/networking";
import get from "lodash/get"; 
import head from "lodash/head";
import { Response, isErrorResponse } from '@vroom-web/networking';
import getConfig from "next/config"; 
import App from 'next/app'

export interface DealValidatorProps extends AppInitialProps {
    isAuthenticated: boolean,
    isVehicleSold: boolean,
    hasPendingDeal: boolean,
    hasInProgressDeal: boolean,
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
 
type StepPagesMappingData = {
     [key: string]: string
}
 
const { publicRuntimeConfig: {BASE_PATH} } = getConfig();
 
const buildUrl = (vin: string, to: string) => (`${BASE_PATH}/${vin}/${to}`);

export const stepPagesMapping = (vin: string) => ({
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
} as StepPagesMappingData)

/**
 * Initial Deal validations 
 * @param AppContext 
 */
export const initDealValidator = async(appContext: AppContext ): Promise<DealValidatorProps>=> {
    const {router, ctx} = appContext
    const vin = get(router, 'query.vin');
    const headers: Record<string, string> | undefined = ctx.req ? { cookie: ctx.req.headers.cookie || '' } : undefined

     let response = await getPurchaseValidator([vin], headers); 
     let isAuth = isAuthenticated(response);

     const appProps = await App.getInitialProps(appContext);

     if (!isErrorResponse(response)) { 
        
        //Vehicle sold
        const isVehicleSold = head(response.data.invSearch.vehicles)?.soldStatus !== 0;

        //does it has pending deal
        const hasPendingDeal = !!response.data.user.deals?.find(f => f.dealSummary.dealStatus.status === DealStatusEnum.PENDING)
        const hasInProgressDeal = response.data.user.deals?.find(f => f.dealSummary.dealStatus.status === DealStatusEnum.IN_PROGRESS)
        //don't show the modal if the deposit is captured and the page is uploadDocument.
        const isDepositCaptured = !!hasInProgressDeal?.dealSummary.depositPaymentInfo?.DepositCaptured

        return { ...appProps, isAuthenticated: isAuth, isVehicleSold, hasPendingDeal,  hasInProgressDeal: !!hasInProgressDeal, isDepositCaptured }
     }else{
         //Is there some error related with the graphQL update auth flag
        isAuth = false;
     }
 
    return { ...appProps, isAuthenticated: isAuth, isVehicleSold: false, hasPendingDeal: false, hasInProgressDeal: false, isDepositCaptured: false  }
  }

  /**
   * Validate Authorization
   * @param response 
   */
  export const isAuthenticated = (response: Response<DealValidatorData>) => {
    console.log(JSON.stringify(response))
    const errorCode = get(response, 'error.response.extensions.error_code'); 
    if(errorCode && errorCode === '401'){
        //Not Authorized
        return false;
    }
 
    return true;
  }