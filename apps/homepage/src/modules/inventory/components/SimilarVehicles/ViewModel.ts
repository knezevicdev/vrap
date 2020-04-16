import Router from 'next/router';
import React from 'react';

import { InventoryStore } from '../../store';

import { Car } from 'src/networking/models/Inventory.v3';
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
    return this.store.similarStatus === Status.ERROR;
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
