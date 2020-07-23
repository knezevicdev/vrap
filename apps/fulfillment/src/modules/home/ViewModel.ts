import { HomeStore } from './store';

import { Status } from 'src/networking/Networker';

class HomeViewModel {
  private store: HomeStore;
  constructor(homeStore: HomeStore) {
    this.store = homeStore;
  }

  getDeliveryOrders(): string[] {
    let results: string[] = [];
    if (this.store.deliveryOrders) {
      results = this.store.deliveryOrders.map((i) => {
        return `${i.make} ${i.model} ${i.year} is at ${i.currentLocation}`;
      });
    }
    return results;
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

export default HomeViewModel;
