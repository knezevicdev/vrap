import { GQLTypes, isErrorResponse, Status } from '@vroom-web/networking';
import { makeObservable, observable, runInAction } from 'mobx';

import { DealStoreProps } from 'src/core/store/DealStore';
import { getVehicleTrade } from 'src/networking';
export interface VehicleTradeInData {
  user: GQLTypes.User;
  invSearch: GQLTypes.InvSearchResult;
}
export default class VehicleTradeInModel implements DealStoreProps {
  data: VehicleTradeInData = {} as VehicleTradeInData;
  dataStatus: Status = Status.LOADING;

  constructor() {
    makeObservable(this, {
      data: observable,
      dataStatus: observable,
    });
  }

  async getData(vin?: string): Promise<void> {
    this.dataStatus = Status.LOADING;

    const response = await getVehicleTrade(vin);

    if (isErrorResponse(response)) {
      runInAction(() => {
        this.dataStatus = Status.ERROR;
      });
      console.log('ERROR', response);
      return;
    }

    runInAction(() => {
      this.data = response.data;
      this.dataStatus = Status.SUCCESS;
    });
  }
}
