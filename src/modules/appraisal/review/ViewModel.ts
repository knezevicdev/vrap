import { isErrorResponse } from '@vroom-web/networking';
import { NextRouter } from 'next/router';

import { makeRequestBody } from '../utils';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { AppraisalPayload } from 'src/interfaces.d';
import { AppraisalRespData } from 'src/networking/models/Appraisal';
import { postAppraisalReview, submitWeblead } from 'src/networking/request';

export default class AppraisalReviewModel {
  readonly title: string = 'my appraisal review';
  private _analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(private _router: NextRouter) {}

  async submitAppraisal(data: any): Promise<void> {
    try {
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

      const leadResp = await submitWeblead(webleadData);
      if (isErrorResponse(leadResp)) throw leadResp;

      const resp = await postAppraisalReview(requestPayload);
      if (isErrorResponse(resp)) throw resp;
      const returnData: AppraisalRespData = resp.data;
      this._router.push({
        pathname: `/price`,
        query: { priceId: returnData.data.ID },
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }
}
