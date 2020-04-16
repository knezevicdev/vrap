import { observable, runInAction } from 'mobx';
import Router from 'next/router';

import { Inventory } from '../../../networking/models/Inventory.v3';
import { Status } from '../../../networking/types';
import { updateUrl } from '../components/util';
import {
  fetchInventoryData,
  fetchPopularCars,
  Filters,
  FiltersData,
  getFiltersDataFromUrl,
  MakeAndModels,
  MaxAndMin,
  SortValue,
  Transmission,
} from '../util';
import { FiltersState, getFiltersStateFromUrl, trackProductList } from './util';

export class Store {
  /*
    TODO
    Make private and use filters (FiltersState) for components to observe
   */
  filtersDataFromUrl: FiltersData | undefined = undefined;

  inventoryData: Inventory | undefined = undefined;
  popularCarsData: Inventory | undefined = undefined;
  makeAndModelsData: MakeAndModels | undefined = undefined;

  @observable status: Status = Status.INITIAL;
  @observable filters: FiltersState = getFiltersStateFromUrl(
    this.filtersDataFromUrl
  );

  private setFiltersDataOnUrlChange = (url: string): void => {
    const filtersFromPath = url.split('?filters=');
    this.filtersDataFromUrl =
      filtersFromPath.length > 1
        ? getFiltersDataFromUrl(filtersFromPath[1])
        : undefined;

    runInAction(() => {
      this.filters = getFiltersStateFromUrl(this.filtersDataFromUrl);
    });
  };

  private setFiltersDataFromServer = (
    serverQueryFilters?: string[] | string
  ): void => {
    this.filtersDataFromUrl = serverQueryFilters
      ? getFiltersDataFromUrl(serverQueryFilters)
      : undefined;
  };

  private handleRouteChangeStart = (url: string): void => {
    runInAction(() => {
      this.setFiltersDataOnUrlChange(url);
      this.status = Status.FETCHING;
    });
  };

  private handleRouteChangeComplete = (): void => {
    const {
      query: { filters },
    } = Router;

    this.getData(filters);
  };

  constructor(
    isDefaultValueFromContext: boolean,
    inventoryData?: Inventory,
    makeAndModelsData?: MakeAndModels,
    popularCarsData?: Inventory,
    serverQueryFilters?: string[] | string
  ) {
    if (!isDefaultValueFromContext) {
      this.inventoryData = inventoryData;
      this.makeAndModelsData = makeAndModelsData;
      this.popularCarsData = popularCarsData;
      this.setFiltersDataFromServer(serverQueryFilters);

      Router.events.on('routeChangeComplete', this.handleRouteChangeComplete);
      Router.events.on('routeChangeStart', this.handleRouteChangeStart);
    }
  }

  resetFilter = (key: Filters): void => {
    const updatedFilters = {
      ...this.filtersDataFromUrl,
      [key]: undefined,
    };

    updateUrl(updatedFilters, Router);
  };

  removeFromList = (key: Filters, value: string): void => {
    const list = (this.filtersDataFromUrl as FiltersData)[key] as string[];
    list.splice(list.indexOf(value), 1);

    const updatedFilters = { ...this.filtersDataFromUrl, [key]: list };
    updateUrl(updatedFilters, Router);
  };

  addToList = (key: Filters, value: string): void => {
    const urlData = this.filtersDataFromUrl
      ? this.filtersDataFromUrl
      : undefined;
    const list = urlData && urlData[key] ? (urlData[key] as string[]) : [];
    list.push(value);

    const updatedFilters = { ...this.filtersDataFromUrl, [key]: list };
    updateUrl(updatedFilters, Router);
  };

  updateMinAndMax = (key: Filters, values: MaxAndMin): void => {
    const updatedFilters = {
      ...this.filtersDataFromUrl,
      [key]: values,
    };
    updateUrl(updatedFilters, Router);
  };

  updateSort = (value: SortValue): void => {
    const updatedFilters = {
      ...this.filtersDataFromUrl,
      [Filters.SORT]: value === SortValue.DEFAULT ? undefined : value,
    };

    updateUrl(updatedFilters, Router);
  };

  updateTransmission = (value: Transmission): void => {
    const id = value === Transmission.AUTO ? 0 : 1;
    const updatedFilters = {
      ...this.filtersDataFromUrl,
      [Filters.TRANSMISSION]: value === Transmission.ALL ? undefined : id,
    };

    updateUrl(updatedFilters, Router);
  };

  getData = async (filters: string[] | string): Promise<void> => {
    try {
      const inventory = await fetchInventoryData(
        filters,
        this.makeAndModelsData
      );

      if (!inventory) {
        throw 'Inventory response is undefined.';
      }
      const hasNoResults = inventory.data.hits.total === 0;

      if (hasNoResults) {
        try {
          const popularCars = await fetchPopularCars();
          if (!popularCars) {
            throw 'Popular Cars response is undefined.';
          }
          this.inventoryData = undefined;
          this.popularCarsData = popularCars;

          runInAction(() => {
            this.status = Status.SUCCESS;
          });
        } catch {
          runInAction(() => {
            this.status = Status.ERROR;
          });
        }
      } else {
        trackProductList(inventory);
        this.inventoryData = inventory;

        runInAction(() => {
          this.status = Status.SUCCESS;
        });
      }
    } catch {
      runInAction(() => {
        this.status = Status.ERROR;
      });
    }
  };
}
