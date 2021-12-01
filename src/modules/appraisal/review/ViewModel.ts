import { makeRequestBody } from '../utils';

import { postAppraisal } from 'src/networking/request';

export default class AppraisalReviewModel {
  readonly title: string = 'my appraisal review';

  async submitAppraisal(data: any): Promise<void> {
    await postAppraisal(makeRequestBody(data)).then((resp) => {
      if (resp.error) {
        console.log(resp);
      } else {
        localStorage.removeItem('appraisal');
        window.location.href = `/appraisal/price?priceId=${resp.data.data.ID}`;
      }
    });
  }
}
