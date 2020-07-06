import { Car } from '@vroom-web/inv-search-networking';
import Router from 'next/router';
import React from 'react';

import { InventoryStore } from '../../store';

import { Status } from 'src/networking/types';

class SimilarVehiclesViewModel {
  private store: InventoryStore;
  readonly title: string = 'Similar Vehicles';
  readonly viewAllCars: string = 'View All Cars';
  readonly viewAll: string = 'View All';

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
    return (
      this.store.similarStatus === Status.ERROR || this.store.similar.length < 4
    );
  }

  getNumCards(): number {
    return this.store.similar.length;
  }

  get(index: number): Car {
    return this.store.similar[index]._source;
  }

  handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    Router.push('/cars');
  }
}

export default SimilarVehiclesViewModel;
