import { GallerySelections, GalleryStore } from '../../store';

import AnalyticsHandler, {
  Product,
} from 'src/integrations/analytics/AnalyticsHandler';

class GallerySelectorViewModel {
  private store: GalleryStore;
  private analyticsHandler: AnalyticsHandler;
  private readonly product: Product;
  readonly general: string = GallerySelections.GENERAL;
  readonly imperfections: string = GallerySelections.DEFECTS;

  constructor(galleryStore: GalleryStore, product: Product) {
    this.store = galleryStore;
    this.analyticsHandler = new AnalyticsHandler();
    this.product = product;
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
}

export default GallerySelectorViewModel;
