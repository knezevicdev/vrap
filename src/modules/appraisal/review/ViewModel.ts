import { isErrorResponse } from '@vroom-web/networking';

import { makeRequestBody } from '../utils';

import { AppraisalRespData } from 'src/networking/models/Appraisal';
import { postAppraisal } from 'src/networking/request';

export default class AppraisalReviewModel {
  readonly title: string = 'my appraisal review';

  async submitAppraisal(data: any): Promise<void> {
    try {
      await postAppraisal(makeRequestBody(data)).then((resp) => {
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
