import { Client, isErrorResponse, Status } from '@vroom-web/networking';
import { action, makeObservable, observable, runInAction } from 'mobx';

import { getPlateToVin, LicensePlateToVinData } from 'src/networking/request';
export default class LicensePlateModel {
  client: Client;
  data: LicensePlateToVinData = {} as LicensePlateToVinData;
  dataStatus: Status = Status.INITIAL;

  constructor(client: Client) {
    this.client = client;
    makeObservable(this, {
      dataStatus: observable,
      data: observable,
      getData: action,
    });
  }

  async getData(lp: string, state: string): Promise<void> {
    this.dataStatus = Status.LOADING;

    const res = await getPlateToVin(lp, state);

    if (isErrorResponse(res)) {
      runInAction(() => {
        this.dataStatus = Status.ERROR;
      });
      return;
    }

    runInAction(() => {
      this.data = res.data;
      this.dataStatus = Status.SUCCESS;
    });
  }
}
