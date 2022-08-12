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

  isAppraisalEmpty(): boolean {
    return this.appraisalStore.isFormEmpty();
  }

  setShowReviewError(value: boolean): void {
    this.appraisalStore.setShowReviewError(value);
  }

  redirectToAppraisalForm(): void {
    if (this._router.asPath.startsWith('/tradeIn-selfService-Review')) {
      this._router.push('/tradeIn-selfService');
    } else {
      this._router.push('/sell/vehicleInformation');
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

  trackAppraisalReviewViewed(): void {
    this._analyticsHandler.trackAppraisalReviewViewed();
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
      this.appraisalStore.clearAppraisal();
      this._router.push({
        pathname: `/appraisal/price`,
        query: { priceId: returnData.data.ID },
      });
    } catch (err) {
      this.setShowReviewError(true);
      console.log(JSON.stringify(err));
    }
  }
}
