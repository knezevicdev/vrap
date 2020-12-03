import { Status } from '@vroom-web/networking';

import Model from './Model';

export default class CongratsViewModel {
  model: Model;

  constructor(model: Model) {
    this.model = model;
  }

  get loading(): boolean {
    return this.model.dataStatus === Status.LOADING;
  }

  get error(): boolean {
    return this.model.dataStatus === Status.ERROR;
  }

  get empty(): boolean {
    if (this.model.dataStatus !== Status.SUCCESS) {
      return false;
    }
    if (!this.model.data.user.deals) {
      return true;
    }
    return this.model.data.user.deals.length === 0;
  }
}
