import { Status } from '@vroom-web/networking';
import { observable, makeObservable, runInAction, action } from 'mobx';

import { DealValidatorProps, initDealValidator } from 'src/core';

export default class DealValidatorModel {
  data: DealValidatorProps = {} as DealValidatorProps;
  dataStatus: Status = Status.LOADING;

  constructor() {
    makeObservable(this, {
      dataStatus: observable,
      data: observable,
      getData: action
  })
  }

  async getData(): Promise<void> {
    this.dataStatus = Status.LOADING;
    const response = await initDealValidator();

    runInAction(() => {
      this.data = response;
      this.dataStatus = Status.SUCCESS;
    });
  }
}
