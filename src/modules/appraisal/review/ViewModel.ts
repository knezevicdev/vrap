import { isErrorResponse } from '@vroom-web/networking';
import { NextRouter } from 'next/router';

import { makeRequestBody } from '../utils';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { AppraisalPayload } from 'src/interfaces.d';
import { AppraisalRespData } from 'src/networking/models/Appraisal';
import { postAppraisalReview, submitWeblead } from 'src/networking/request';
import Store from 'src/store';
import { ABSmartStore } from 'src/store/abSmartStore';
import { AppraisalStore } from 'src/store/appraisalStore';

export default class AppraisalReviewModel {
  readonly title: string = 'my appraisal review';
  private _analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  appraisalStore: AppraisalStore;
  absmartStore: ABSmartStore;

  constructor(public store: Store, private _router: NextRouter) {
    this.appraisalStore = store.appraisal;
    this.absmartStore = store.absmart;
  }

  get isTradeIn(): boolean {
    return this._router.asPath.includes('/tradeIn-selfService-Review');
  }

  isAppraisalEmpty(): boolean {
    return this.appraisalStore.isFormEmpty();
  }

  setShowReviewError(value: boolean): void {
    if (value) {
      this.appraisalStore.setReviewError();
    } else {
      this.appraisalStore.clearReviewError();
    }
  }

  redirectToAppraisalForm(): void {
    if (this.isTradeIn) {
      this._router.push('/sell/tradeIn-selfService');
    } else {
      this._router.push({
        pathname: '/sell/vehicleInformation',
        query: { ...this._router.query },
      });
    }
  }

  getAnalyticsHandler = (): AnalyticsHandler => {
    return this._analyticsHandler;
  };

  trackIdentify(): void {
    const data = this.appraisalStore;
    const requestPayload: AppraisalPayload = makeRequestBody(data);

    const identifyData = {
      ...requestPayload,
      phone: requestPayload.phoneNumber,
    };

    this._analyticsHandler.trackAppraisalIdentify(
      data.user.externalUserID,
      identifyData
    );
  }

  setTradeFormType(): void {
    if (this._router.query.type === 'trade') {
      this.appraisalStore.setForm('trade');
    }
  }

  trackAppraisalReviewViewed(): void {
    this._analyticsHandler.trackAppraisalReviewViewed(
      this.appraisalStore.eventCategory
    );
  }

  async submitAppraisal(token: string): Promise<void> {
    try {
      this.setShowReviewError(false);

      const data = this.appraisalStore;
      const requestPayload: AppraisalPayload = makeRequestBody(data);
      const leadTrackingData = {
        email: requestPayload.email,
        phone: requestPayload.phoneNumber,
        lead_id: requestPayload.lead_id,
      };

      this._analyticsHandler.trackLeadSubmitted('Appraisal', leadTrackingData);

      const webleadData = {
        firstName: requestPayload.firstName,
        lastName: requestPayload.lastName,
        email: requestPayload.email,
        phone: requestPayload.phoneNumber,
        correlationId: requestPayload.lead_id,
      };

      try {
        const leadResp = await submitWeblead(webleadData);
        if (isErrorResponse(leadResp)) throw leadResp;
      } catch (err) {
        console.log(JSON.stringify(err));
      }

      const resp = await postAppraisalReview(requestPayload, token);
      if (isErrorResponse(resp)) throw resp;
      const returnData: AppraisalRespData = resp.data;

      if (this.isTradeIn) {
        const offerDetailData = {
          make: returnData.data.Make__c,
          model: returnData.data.Model__c,
          price: returnData.data.Price__c,
          trim: returnData.data.Trim__c,
          year: returnData.data.Year__c,
          miles: returnData.data.miles,
          offerExpiration: returnData.data.Good_Until__c,
          vin: returnData.data.VIN__c,
          id: returnData.data.ID,
          offerId: returnData.data.offer_id,
          offerStatus: returnData.data.offer_status,
        };
        this.store.offer.getOfferDetail(offerDetailData);
        this.store.offer.setShowOfferDialog(true);
      } else {
        this.appraisalStore.clearAppraisal();
        this._router.push({
          pathname: `/appraisal/price`,
          query: { priceId: returnData.data.ID },
        });
      }
    } catch (err) {
      this.setShowReviewError(true);
      console.log(JSON.stringify(err));
    }
  }

  get isDealLoading(): boolean {
    return this.store.deal.loading;
  }

  get showOfferDialog(): boolean {
    return this.store.offer.showOfferDialog;
  }
}
