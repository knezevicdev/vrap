import { makeAutoObservable, runInAction } from 'mobx';

import { Appraisal } from 'src/modules/appraisal/review/store';

export class AppraisalStore {
  appraisalDetail?: Appraisal;

  constructor() {
    makeAutoObservable(this);
  }

  async init(): Promise<void> {
    const appraisal = localStorage.getItem('appraisal');

    if (appraisal !== null) {
      this.appraisalDetail = JSON.parse(appraisal);
    } else {
      return;
    }
  }
}
