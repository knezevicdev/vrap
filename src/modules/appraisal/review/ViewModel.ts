import { makeRequestBody } from '../utils';

import { postAppraisal } from 'src/networking/request';

export default class AppraisalReviewModel {
  readonly title: string = 'my appraisal review';

  submitAppraisal(data: any): void {
    postAppraisal(makeRequestBody(data)).then((resp) => {
      if (resp.error) {
        console.log(resp);
      } else {
        localStorage.removeItem('appraisal');
        if (resp.data.data.ID === '584824b4-d392-43ff-be3a-b38885ee50f4') {
          const appraisalCompletePath =
            location.pathname === '/trade/review'
              ? '/trade/appraisal/complete'
              : '/sell/appraisal/complete';

          // history.push({
          //   pathname: getThemedPath(appraisalCompletePath, theme),
          //   search: getModeParam(mode),
          // });
          window.location.href = appraisalCompletePath;
        } else {
          window.location.href = `/appraisal/price?priceId=${resp.data.data.ID}`;
        }
      }
    });
  }
}
