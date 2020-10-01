import { Car } from '@vroom-web/inv-search-networking';
import Router from 'next/router';
import React from 'react';

import { InventoryStore } from 'src/modules/inventory/store';
import { Status } from 'src/networking/types';

class SimilarVehiclesViewModel {
  private store: InventoryStore;
  readonly title: string = 'Similar Vehicles';
  readonly viewAllCars: string = 'View All Cars';
  readonly viewAll: string = 'View all';

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
    const similarVehicleCount = 4;
    try {
      const similarCars = this.store.similar
        .slice(0, similarVehicleCount)
        .map((car) => car._source);
      return similarCars;
    } catch {
      return [];
    }
  };

  handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    Router.push('/cars');
  }
}

export default SimilarVehiclesViewModel;
