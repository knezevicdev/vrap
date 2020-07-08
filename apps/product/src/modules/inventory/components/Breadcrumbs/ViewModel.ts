import {
  addAllModels,
  addModel,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from '../../store';

interface Crumb {
  key: string;
  name: string;
  onClick: () => void;
}

class BreadcrumbsViewModel {
  private car: Car;

  constructor(inventoryStore: InventoryStore) {
    this.car = inventoryStore.vehicle._source;
  }

  crumbs(): Crumb[] {
    const { make, makeSlug, model, modelSlug } = this.car;

    const catalogHref = getUrlFromFiltersData();
    const navigateToCatalog = (): void => {
      window.location.href = catalogHref;
    };

    const allModelsFiltersData = addAllModels(makeSlug);
    const allModelsHref = getUrlFromFiltersData(allModelsFiltersData);
    const navigateToAllModels = (): void => {
      window.location.href = allModelsHref;
    };

    const modelFiltersData = addModel(makeSlug, modelSlug);
    const modelHref = getUrlFromFiltersData(modelFiltersData);
    const navigateToModel = (): void => {
      window.location.href = modelHref;
    };

    return [
      {
        key: 'all',
        name: 'All Cars',
        onClick: navigateToCatalog,
      },
      {
        key: 'make',
        name: make,
        onClick: navigateToAllModels,
      },
      {
        key: 'model',
        name: model,
        onClick: navigateToModel,
      },
    ];
  }
}

export default BreadcrumbsViewModel;
