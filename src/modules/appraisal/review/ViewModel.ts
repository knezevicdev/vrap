import { isErrorResponse } from '@vroom-web/networking';

import { makeRequestBody } from '../utils';

import { AppraisalPayload } from 'src/interfaces.d';
import { AppraisalRespData } from 'src/networking/models/Appraisal';
import { postAppraisalReview } from 'src/networking/request';

export default class AppraisalReviewModel {
  readonly title: string = 'my appraisal review';

  async submitAppraisal(data: any): Promise<void> {
    try {
      const requestPayload: AppraisalPayload = makeRequestBody(data);
      await postAppraisalReview(requestPayload).then((resp) => {
        if (isErrorResponse(resp)) throw resp;
        const returnData: AppraisalRespData = resp.data;
        localStorage.removeItem('appraisal');
        window.location.href = `/appraisal/price?priceId=${returnData.data.ID}`;
      });
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  }
}
