import { Filters } from '@vroom-web/catalog-url-integration';
import { Car, Hit, Inventory } from '@vroom-web/inv-search-networking';
import { reaction } from 'mobx';

import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { CarsStore } from 'src/modules/cars/store';
import { Status } from 'src/networking/types';

class CarsViewModel {
  private readonly store: CarsStore;
  private analyticsHandler: AnalyticsHandler;
  private disposeReaction?: () => void;

  constructor(store: CarsStore) {
    this.store = store;
    this.analyticsHandler = new AnalyticsHandler();
  }

  private trackProductList(): void {
    if (!this.store.inventoryData) {
      return;
    }
    const cars = this.store.inventoryData.hits.hits.map((hit: Hit) => {
      const { _source } = hit;
      return _source;
    });
    const products: Product[] = cars.map((car, index) => {
      const {
        consignmentPartnerId,
        inventoryId,
        leadFlagPhotoUrl,
        listingPrice,
        make,
        model,
        soldStatus,
        vin,
        year,
      } = car;
      const name = `${year} ${make} ${model}`;
      const url = `/inventory/${vin}`;
      return {
        imageUrl: leadFlagPhotoUrl,
        inventoryType: consignmentPartnerId ? 'Consignment' : 'Vroom',
        make,
        model,
        name,
        partnerId: consignmentPartnerId,
        position: index,
        price: listingPrice,
        sku: inventoryId,
        soldStatus,
        url,
        vin,
        year,
      };
    });

    this.analyticsHandler.trackProductListViewed(products);

    if (!this.store.filtersData) {
      return;
    }

    const formattedFilters: { type: string; value: any }[] = [];
    Object.entries(this.store.filtersData).forEach(([filter, value]) => {
      switch (filter) {
        case Filters.MAKE_AND_MODELS:
          formattedFilters.push({
            type: 'Make & Models',
            value,
          });
          break;
        case Filters.BODY_TYPES:
          formattedFilters.push({
            type: 'Body Type',
            value,
          });
          break;
        case Filters.COLORS:
          formattedFilters.push({
            type: 'Color',
            value,
          });
          break;
        case Filters.YEAR:
          formattedFilters.push({
            type: 'Year',
            value,
          });
          break;
        case Filters.PRICE:
          formattedFilters.push({
            type: 'Year',
            value,
          });
          break;
        case Filters.MILES:
          formattedFilters.push({
            type: 'Miles',
            value,
          });
          break;
        case Filters.TRANSMISSION:
          formattedFilters.push({
            type: 'Transmission',
            value,
          });
          break;
        case Filters.DRIVE_TYPE:
          formattedFilters.push({
            type: 'Drive Type',
            value,
          });
          break;
      }
    });

    const sort = this.store.filtersData[Filters.SORT];
    this.analyticsHandler.trackProductListFiltered(
      products,
      formattedFilters,
      sort
    );
  }

  startReaction(): void {
    this.disposeReaction = reaction(
      () => this.store.inventoryStatus,
      (status) => {
        if (status === Status.SUCCESS) {
          this.trackProductList();
        }
      },
      {
        fireImmediately: true,
      }
    );
  }

  stopReaction(): void {
    if (this.disposeReaction) {
      this.disposeReaction();
    }
  }

  hasError = (): boolean => {
    return !this.isLoading() && !this.store.hasInventory;
  };

  private hasFullError = (): boolean => {
    return this.hasError() && !this.store.hasPopularCars;
  };

  errorTop = (): string => {
    return this.hasFullError()
      ? 'Something went wrong.'
      : `Looks like we couldn't find what you were looking for.`;
  };

  errorBottom = (): string => {
    return this.hasFullError()
      ? 'Please try again.'
      : 'Check out other popular cars.';
  };

  hasCars = (): boolean => {
    return !this.hasFullError();
  };

  isLoading = (): boolean => {
    return (
      this.store.inventoryStatus === Status.FETCHING ||
      this.store.popularCarsStatus === Status.FETCHING
    );
  };

  loadingCars = (): Car[] => {
    return Array(this.store.inventoryCardsPerPage).fill(undefined);
  };

  private getCarsFromStore = (inventory: Inventory): Car[] => {
    return inventory.hits.hits.map((hit: Hit) => {
      const { _source } = hit;
      return _source;
    });
  };

  popularCars = (): Car[] => {
    return this.getCarsFromStore(this.store.popularCarsData as Inventory);
  };

  inventoryCars = (): Car[] => {
    return this.getCarsFromStore(this.store.inventoryData as Inventory);
  };

  cars = (): Car[] => {
    if (this.isLoading()) {
      return this.loadingCars();
    }
    if (this.hasError()) {
      return this.popularCars();
    }
    return this.inventoryCars();
  };
}

export default CarsViewModel;
