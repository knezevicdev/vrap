import { Status } from '@vroom-web/networking';
import { action, makeObservable, observable, runInAction } from 'mobx';
import Router from 'next/router';

import { DealValidatorProps, initDealValidator } from './services';

export default class DealValidatorModel {
  data: DealValidatorProps | null = null;
  dataStatus: Status = Status.LOADING;

  constructor() {
    console.log("stating deal validator")
    makeObservable(this, {
      dataStatus: observable,
      data: observable,
      getData: action,
    });
  }

  async getData(): Promise<void> {
    this.dataStatus = Status.LOADING;
    console.log("Init Validator Request", this.dataStatus)
    const response = await initDealValidator(Router);
    console.log("Deal Validator Responses", JSON.stringify(response))
    runInAction(() => {
      this.data = response;
      this.dataStatus = Status.SUCCESS;
    });
  }
}
