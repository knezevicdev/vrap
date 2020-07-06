import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from '../../store';

import { updateUrl } from 'src/modules/cars/utils/navigation';
import { ALL_KEY, Filters } from 'src/modules/cars/utils/types';

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

  private sanitize(str: string): string {
    const toUnderscoreRegex = /-| /g;
    return str.replace(toUnderscoreRegex, '_').toLowerCase();
  }

  crumbs(): Crumb[] {
    const { make, model } = this.car;
    const sMake = this.sanitize(make);
    const sModel = this.sanitize(model);

    const makeFilter = {
      [Filters.MAKE_AND_MODELS]: { [sMake]: [ALL_KEY] },
    };

    const modelFilter = {
      [Filters.MAKE_AND_MODELS]: { [sMake]: [sModel] },
    };

    return [
      {
        key: 'all',
        name: 'All Cars',
        onClick: (): void => updateUrl(undefined),
      },
      {
        key: 'make',
        name: make,
        onClick: (): void => updateUrl(makeFilter),
      },
      {
        key: 'model',
        name: model,
        onClick: (): void => updateUrl(modelFilter),
      },
    ];
  }
}

export default BreadcrumbsViewModel;
