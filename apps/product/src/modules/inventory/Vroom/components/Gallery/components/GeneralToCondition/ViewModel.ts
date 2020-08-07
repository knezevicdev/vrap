import { GallerySelections, GalleryStore } from '../../store';

import globalEnv from 'src/globalEnv';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

class GalleryToConditionViewModel {
  private store: GalleryStore;
  private analyticsHandler: AnalyticsHandler;
  readonly goToConditionText: string = 'VIEW IMPERFECTION PHOTOS';
  readonly defaultImage = {
    alt: 'Gallery To Condition Photo',
    src: `${globalEnv.BASE_PATH}/modules/inventory/components/gallery/LastGallery.png`,
  };

  constructor(galleryStore: GalleryStore) {
    this.store = galleryStore;
    this.analyticsHandler = new AnalyticsHandler();
  }

  goToCondition = (): void => {
    this.store.changeSelectedGallery(GallerySelections.DEFECTS);
    this.analyticsHandler.trackConditionCTA();
  };
}

export default GalleryToConditionViewModel;
