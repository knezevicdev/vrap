import { GQLTypes } from '@vroom-web/networking';
import last from 'lodash/last';
import getConfig from 'next/config';
//import Router from 'next/router';

import { getCurrentVin } from 'src/networking/util/getCurrentVin';

export enum DealStepsEnum {
  ROOT = 'CheckoutTradeIn',
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
  VEHICLE_TRADE_IN = 'TradeInVehicle',
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

export const stepPagesMapping = (vin: string): StepPagesMappingData =>
  ({
    [DealStepsEnum.TRADE]: `/e2e/${vin}/tradeInLoanInfo`,
    [DealStepsEnum.REGISTRATION]: `/e2e/${vin}/registration`,
    [DealStepsEnum.DELIVERY]: `/e2e/${vin}/delivery`,
    [DealStepsEnum.PAYMENT]: `/e2e/${vin}/payment`,
    [DealStepsEnum.FINANCING]: `/e2e/${vin}/vroomFinancing`,
    [DealStepsEnum.FINANCING_PENDING]: `/e2e/${vin}/checkoutTradeIn`,
    [DealStepsEnum.FINANCING_OPTION]: `/e2e/${vin}/checkoutTradeIn`,
    [DealStepsEnum.FINANCING_DECLINED]: `/e2e/${vin}/checkoutTradeIn`,
    [DealStepsEnum.PRODUCTS]: `/e2e/${vin}/dealCoverage`,
    [DealStepsEnum.DEPOSIT]: `/e2e/${vin}/deposit-form`,
    [DealStepsEnum.DOCUMENT_UPLOAD]:`/e2e/${vin}/documentUpload`,
    [DealStepsEnum.DEAL_SUMMARY]: `${BASE_PATH}/congratulations`,
    [DealStepsEnum.VEHICLE_TRADE_IN]: `${BASE_PATH}/${vin}/vehicleTradeIn`,
    [DealStepsEnum.ROOT]: `/e2e/${vin}/checkoutTradeIn`,
  } as StepPagesMappingData);

class Navigation {
  stepBack(dealStatus: GQLTypes.DealStatus | undefined, currentStep: DealStepsEnum) {
 
    const index: number | null | undefined =  dealStatus && dealStatus.pastSteps && dealStatus.pastSteps.indexOf(currentStep)

    const lastStep = (()=> { 
      if(typeof index === 'number' && index > -1) {
     
        return dealStatus && dealStatus.pastSteps && dealStatus.pastSteps[index -1];
      } 
      return  dealStatus && dealStatus.pastSteps && last(dealStatus.pastSteps);
    })()


    const vin = getCurrentVin();
     
    if (!lastStep && vin) {
      //Temporary for backward compatibility with classic   
      window.location.href = stepPagesMapping(vin)[DealStepsEnum.ROOT];
      return;
    }

    if (lastStep && vin) {
      //Temporary for backward compatibility with classic
      window.location.href = stepPagesMapping(vin)[lastStep];
      return;
    }

    //Single Page Application after move all checkout steps to the new code base
    //TODO: navigate using nextJS after move others page to vroom-web 
    //Router.push({
    //  pathname: vin && lastStep && stepPagesMapping(vin)[lastStep],
    //});
  }
}

export default Navigation;
