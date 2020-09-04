import {
  addAllModels,
  addModel,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from 'src/modules/inventory/store';

interface Crumb {
  key: string;
  name: string;
  path: string;
}

class BreadcrumbsViewModel {
  private car: Car;

  constructor(inventoryStore: InventoryStore) {
    this.car = inventoryStore.vehicle._source;
  }

  crumbs(): Crumb[] {
    const { make, makeSlug, model, modelSlug, year } = this.car;

    let catalogHref = getUrlFromFiltersData();
    if (catalogHref.charAt(catalogHref.length - 1) === '/') {
      catalogHref = catalogHref.slice(0, -1);
    }

    const allModelsFiltersData = addAllModels(makeSlug);
    const allModelsHref = getUrlFromFiltersData(allModelsFiltersData);

    const modelFiltersData = addModel(makeSlug, modelSlug);
    const modelHref = getUrlFromFiltersData(modelFiltersData);

    const yearModelFiltersData = addModel(makeSlug, modelSlug, {
      year: {
        min: year,
        max: year,
      },
    });
    const yearModelHref = getUrlFromFiltersData(yearModelFiltersData);

    return [
      {
        key: 'all',
        name: 'All Cars',
        path: catalogHref,
      },
      {
        key: 'make',
        name: make,
        path: allModelsHref,
      },
      {
        key: 'model',
        name: model,
        path: modelHref,
      },
      {
        key: 'year',
        name: year.toString(),
        path: yearModelHref,
      },
      {
        key: 'yearmakemodel',
        name: `${year} ${make} ${model}`,
        path: '',
      },
    ];
  }
}

export default BreadcrumbsViewModel;
