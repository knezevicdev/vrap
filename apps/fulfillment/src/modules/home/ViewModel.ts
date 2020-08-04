import { HomeStore } from './store';

import { Status } from 'src/networking/Networker';

interface Header {
  header: string;
  accessor: string;
}
interface Row {
  [key: string]: number | string;
  id: number;
  vin: string;
  year: number;
  make: string;
  model: string;
  currentLocation: string;
}

class HomeViewModel {
  private store: HomeStore;
  constructor(homeStore: HomeStore) {
    this.store = homeStore;
  }

  getHeaders(): Header[] {
    return [
      { header: 'VIN', accessor: 'vin' },
      { header: 'Year', accessor: 'year' },
      { header: 'Make', accessor: 'make' },
      { header: 'Model', accessor: 'model' },
      { header: 'Currently At', accessor: 'currentLocation' },
    ];
  }

  getDeliveryOrders(): Row[] {
    return (
      this.store.deliveryOrders?.map((i) => {
        return { ...i.vehicle, currentLocation: i.currentLocation };
      }) || []
    );
  }

  loading(): boolean {
    return (
      this.store.deliveryOrderStatus === Status.FETCHING ||
      this.store.deliveryOrderStatus === Status.INITIAL
    );
  }

  ready(): boolean {
    return this.store.deliveryOrderStatus === Status.SUCCESS;
  }

  error(): boolean {
    return this.store.deliveryOrderStatus === Status.ERROR;
  }
}

export default HomeViewModel;
