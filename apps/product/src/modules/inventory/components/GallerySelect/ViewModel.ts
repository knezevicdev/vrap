import { GallerySelections, InventoryStore } from '../../store';

class GallerySelectorViewModel {
  private store: InventoryStore;
  readonly general: string = GallerySelections.GENERAL;
  readonly imperfections: string = GallerySelections.DEFECTS;

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: GallerySelections
  ): void => {
    event.preventDefault();
    this.store.changeSelectedGallery(newValue);
  };

  getSelectedGallery(): string {
    return this.store.selectedGallery;
  }
}

export default GallerySelectorViewModel;
