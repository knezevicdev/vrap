import { FeaturesStore } from './store';

import { InventoryStore } from 'src/modules/inventory/store';

class FeaturesViewModel {
  private readonly features: string[] = [];
  private readonly featuresStore: FeaturesStore;
  private readonly limitedLength = 14;

  readonly title: string = 'Features';

  constructor(inventoryStore: InventoryStore, featuresStore: FeaturesStore) {
    this.features = inventoryStore.vehicle._source.optionalFeatures.split(',');
    this.featuresStore = featuresStore;
  }
  getFeatures = (): string[] => {
    const oneKey = '1 Key';

    if (this.features.length < this.limitedLength) {
      return [...this.features, oneKey];
    }
    if (this.featuresStore.limited) {
      const displayLength = this.limitedLength - 1;
      return [...this.features.slice(0, displayLength), oneKey];
    } else {
      return [...this.features, oneKey];
    }
  };

  getButtonLabel = (): string => {
    return this.featuresStore.limited
      ? 'Show all features'
      : 'Show less features';
  };

  showButton = (): boolean => {
    return this.features.length > this.limitedLength;
  };

  onClick = (): void => {
    this.featuresStore.toggleLimited();
  };
}

export default FeaturesViewModel;
