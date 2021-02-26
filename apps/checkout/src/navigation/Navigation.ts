import { GQLTypes } from '@vroom-web/networking';
import last from 'lodash/last';
import getConfig from 'next/config';
import Router from 'next/router';

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
    [DealStepsEnum.DOCUMENT_UPLOAD]: buildUrl(vin, 'documentUpload'),
    [DealStepsEnum.DEAL_SUMMARY]: `${BASE_PATH}/congratulations`,
    [DealStepsEnum.ROOT]: `/e2e/${vin}/checkoutTradeIn`,
  } as StepPagesMappingData);

class Navigation {
  stepBack(dealStatus: GQLTypes.DealStatus | undefined) {
    const lastStep =
      dealStatus && dealStatus.pastSteps && last(dealStatus.pastSteps);
    const vin = getCurrentVin();

    if (!lastStep && vin) {
      //Temporary for backward compatibility with classic
      window.location.href = stepPagesMapping(vin)[DealStepsEnum.ROOT];
      return;
    }

    //Single Page Application after move all checkout steps to the new code base
    Router.push({
      pathname: vin && lastStep && stepPagesMapping(vin)[lastStep],
    });
  }
}

export default Navigation;
