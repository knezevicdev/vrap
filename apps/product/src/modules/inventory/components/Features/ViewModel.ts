import { InventoryStore } from '../../store';
import { FeaturesStore } from './store';

class FeaturesViewModel {
  private readonly features: string[] = [];
  private readonly featuresStore: FeaturesStore;
  private readonly limitedLength = 15;

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
      const displayLength = this.limitedLength - 2;
      return [...this.features.slice(0, displayLength), oneKey];
    } else {
      return [...this.features, oneKey];
    }
  };

  getButtonLabel = (): string => {
    return this.featuresStore.limited
      ? 'SHOW ALL FEATURES'
      : 'SHOW LESS FEATURES';
  };

  showButton = (): boolean => {
    return this.features.length > this.limitedLength;
  };

  onClick = (): void => {
    this.featuresStore.toggleLimited();
  };
}

export default FeaturesViewModel;
