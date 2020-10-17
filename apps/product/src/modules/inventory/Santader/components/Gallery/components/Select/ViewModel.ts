import AnalyticsHandler, { Product } from 'src/integrations/AnalyticsHandler';
import { GallerySelections, InventoryStore } from 'src/modules/inventory/store';

class GallerySelectorViewModel {
  private store: InventoryStore;
  public analyticsHandler: AnalyticsHandler;
  private readonly product: Product;
  readonly general: string = GallerySelections.GENERAL;
  public defects = '';

  constructor(inventoryStore: InventoryStore, product: Product) {
    this.store = inventoryStore;
    this.analyticsHandler = new AnalyticsHandler();
    this.product = product;
    this.defects = this.product.spincarSpinUrl
      ? GallerySelections.THREE_SIXTY
      : GallerySelections.DEFECTS;
  }

  handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: GallerySelections
  ): void => {
    event.preventDefault();
    this.store.changeSelectedGallery(newValue);
    this.analyticsHandler.trackGallerySelection(this.product, newValue);
  };

  getSelectedGallery(): string {
    return this.store.selectedGallery;
  }

  hasDefects = (): boolean => {
    return !!this.product.spincarSpinUrl || !!this.product.defectPhotos;
  };
}

export default GallerySelectorViewModel;
