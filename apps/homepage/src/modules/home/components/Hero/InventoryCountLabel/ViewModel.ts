import { HomeStore } from '../../../store';

interface Link {
  label: string;
  href: string;
}

class HeroViewModel {
  private store: HomeStore;

  constructor(store: HomeStore) {
    this.store = store;
  }

  private inventoryCount(): number | undefined {
    return this.store.inventoryCount;
  }

  private label(): string {
    // TODO: FIT-196 saw the addition of TEMPORARY_FLAG_TO_SHOW_GENERIC_LABEL,
    // because with the slowdown of COVID-19, the count is lower than usual.
    // Remove this when we are confortable dislaying the exact inventory count again.
    const TEMPORARY_FLAG_TO_SHOW_GENERIC_LABEL = true;
    const inventoryCount = this.inventoryCount();
    if (!inventoryCount || TEMPORARY_FLAG_TO_SHOW_GENERIC_LABEL) {
      return 'Browse all low-mileage cars\xa0and\xa0trucks';
    }
    return `Browse over ${inventoryCount} low-mileage cars\xa0and\xa0trucks`;
  }

  link(): Link {
    return {
      href: '/cars',
      label: this.label(),
    };
  }
}

export default HeroViewModel;
