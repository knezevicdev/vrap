import { InventoryStore } from 'src/modules/inventory/store';

class DescriptionViewModel {
  private store: InventoryStore;

  readonly description: string;
  readonly image: string;

  constructor(inventoryStore: InventoryStore, props) {
    this.image = props.original;
    this.description = props.description;
    this.store = inventoryStore;
  }
}

export default DescriptionViewModel;
