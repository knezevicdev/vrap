import Router from 'next/router';

import { Store } from '../../store';
import { Filters, INVENTORY_LIMIT } from '../../util';
import { updateUrl } from '../util';

import { Car, Hit, Inventory } from 'src/networking/models/Inventory.v3';
import { Status } from 'src/networking/types';

class InventoryViewModel {
  private store: Store;

  constructor(carStore: Store) {
    this.store = carStore;
  }

  getCarsFromStore(inventory: Inventory): Car[] {
    return inventory.data.hits.hits.map((hit: Hit) => {
      const { _source } = hit;
      return _source;
    });
  }

  getCarsFromInventory(): Car[] | undefined {
    if (this.store.inventoryData) {
      const carsFromInventory = this.getCarsFromStore(this.store.inventoryData);
      return carsFromInventory.length > 0 ? carsFromInventory : undefined;
    }
  }

  getCars(): { cars: Car[]; areTheyPopularCars: boolean } {
    if (this.isLoading()) {
      return {
        cars: Array(INVENTORY_LIMIT).fill(undefined),
        areTheyPopularCars: false,
      };
    } else {
      const carsFromInventory = this.getCarsFromInventory();
      if (carsFromInventory) {
        return { cars: carsFromInventory, areTheyPopularCars: false };
      } else {
        return {
          cars: this.getCarsFromStore(this.store.popularCarsData as Inventory),
          areTheyPopularCars: true,
        };
      }
    }
  }

  getPageAndCount(): { page: number; count: number } | undefined {
    if (this.store.inventoryData) {
      const total = this.store.inventoryData.data.hits.total;

      const page = this.store.filtersDataFromUrl?.page
        ? (this.store.filtersDataFromUrl.page as number)
        : 1;
      const count = Math.ceil(total / INVENTORY_LIMIT);

      return { page, count };
    }
  }

  isLoading(): boolean {
    return this.store.status === Status.FETCHING;
  }

  hasError(): boolean {
    return this.store.status === Status.ERROR;
  }

  hidePagination(): boolean {
    return this.hasError() || this.getCars().areTheyPopularCars;
  }

  getErrorMessages(): { top: string; bottom: string } {
    return {
      top: this.hasError()
        ? 'Something went wrong.'
        : `Looks like we couldn't find what you were looking for.`,
      bottom: this.hasError()
        ? 'Please try again.'
        : 'Check out other popular cars.',
    };
  }

  onPageChange = (_event: object, page: number): void => {
    const actualPage = page == 1 ? undefined : page;

    const updatedFilters = {
      ...this.store.filtersDataFromUrl,
      [Filters.PAGE]: actualPage,
    };

    updateUrl(updatedFilters, Router, true);

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
}

export default InventoryViewModel;
