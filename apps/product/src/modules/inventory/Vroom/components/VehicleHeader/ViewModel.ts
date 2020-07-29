import { InventoryStore } from 'src/modules/inventory/store';

interface Summary {
  ymm: string;
  trim: string;
  miles: string;
  price: string;
}
class VehicleHeaderViewModel {
  private store: InventoryStore;

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  summary(): Summary {
    const {
      listingPrice,
      make,
      miles,
      model,
      trim,
      year,
    } = this.store.vehicle._source;
    return {
      ymm: `${year} ${make} ${model}`,
      trim: trim,
      miles: `${miles.toLocaleString('en-US')} miles`,
      price: `$${listingPrice.toLocaleString('en-US')}`,
    };
  }

  isAvailableSoon = (): boolean => {
    const { leadFlagPhotoUrl, hasStockPhotos } = this.store.vehicle._source;
    return leadFlagPhotoUrl === '' || hasStockPhotos;
  };
}

export default VehicleHeaderViewModel;
