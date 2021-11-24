import { makeRequestBody } from '../utils';

import { postAppraisal } from 'src/networking/request';
import Store from 'src/store';

export default class AppraisalReviewModel {
  readonly title: string = 'my appraisal review';

  constructor(private _store: Store) {}

  submitAppraisal(data: any): void {
    postAppraisal(makeRequestBody(data)).then((response) => {
      console.log(response);
    });
  }
}
