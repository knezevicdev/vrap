import { InventoryStore } from '../../store';

class FeaturesViewModel {
  private features: string[];
  readonly title: string = 'Features';

  constructor(inventoryStore: InventoryStore) {
    this.features = inventoryStore.vehicle._source.optionalFeatures.split(',');
  }

  display(limited: boolean): string[] {
    const oneKey = '1 Key';
    const limitedLength = 15;

    const toggle = `<button>Show ${limited ? 'More' : 'Less'}</button>`;
    if (this.features.length < limitedLength) {
      return [...this.features, oneKey];
    }
    if (limited) {
      const displayLength = limitedLength - 2;
      return [...this.features.slice(0, displayLength), oneKey, toggle];
    } else {
      return [...this.features, oneKey, toggle];
    }
  }
}

export default FeaturesViewModel;
