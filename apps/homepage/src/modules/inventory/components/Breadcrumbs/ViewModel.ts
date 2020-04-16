import Router from 'next/router';

import { ALL_KEY, updateUrl } from '../../../cars/components/util';
import { Filters } from '../../../cars/util';
import { InventoryStore } from '../../store';

import { Car } from 'src/networking/models/Inventory.v3';

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
        onClick: (): void => updateUrl(undefined, Router),
      },
      {
        key: 'make',
        name: make,
        onClick: (): void => updateUrl(makeFilter, Router),
      },
      {
        key: 'model',
        name: model,
        onClick: (): void => updateUrl(modelFilter, Router),
      },
    ];
  }
}

export default BreadcrumbsViewModel;
