import { DeliveryOrderStore } from './store';

import { Details } from 'src/networking/models/DeliveryOrder';
import { Status } from 'src/networking/Networker';

class DeliveryOrderViewModel {
  private store: DeliveryOrderStore;
  constructor(store: DeliveryOrderStore) {
    this.store = store;
  }

  getDeliveryOrder(): Details {
    return this.store.deliveryOrder;
  }

  loading(): boolean {
    const result =
      this.store.deliveryOrderStatus === Status.FETCHING ||
      this.store.deliveryOrderStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.deliveryOrderStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    return this.store.deliveryOrderStatus === Status.ERROR;
  }
}

export default DeliveryOrderViewModel;
