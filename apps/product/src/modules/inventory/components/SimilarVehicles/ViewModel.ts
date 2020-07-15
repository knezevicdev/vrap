import { Car } from '@vroom-web/inv-search-networking';
import Router from 'next/router';
import React from 'react';

import { InventoryStore } from '../../store';

import { Status } from 'src/networking/types';

class SimilarVehiclesViewModel {
  private store: InventoryStore;
  readonly title: string = 'Similar Vehicles';
  readonly viewAllCars: string = 'View All Cars';
  readonly viewAll: string = 'VIEW ALL';

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  loading(): boolean {
    const result =
      this.store.similarStatus === Status.FETCHING ||
      this.store.similarStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.similarStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    return this.store.similarStatus === Status.ERROR;
  }

  getCars = (): Car[] => {
    return this.store.similar.map((car) => car._source);
  };

  handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    Router.push('/cars');
  }
}

export default SimilarVehiclesViewModel;
