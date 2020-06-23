import { GallerySelections, GalleryStore } from '../../store';

import AnalyticsHandler from 'src/integrations/analytics/AnalyticsHandler';

class GallerySelectorViewModel {
  private store: GalleryStore;
  private analyticsHandler: AnalyticsHandler;
  readonly general: string = GallerySelections.GENERAL;
  readonly imperfections: string = GallerySelections.DEFECTS;

  constructor(galleryStore: GalleryStore) {
    this.store = galleryStore;
    this.analyticsHandler = new AnalyticsHandler();
  }

  handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: GallerySelections
  ): void => {
    event.preventDefault();
    this.store.changeSelectedGallery(newValue);
    this.analyticsHandler.trackGallerySelection(newValue);
  };

  getSelectedGallery(): string {
    return this.store.selectedGallery;
  }
}

export default GallerySelectorViewModel;
