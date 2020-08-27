import getConfig from 'next/config';

import { GallerySelections, GalleryStore } from '../../store';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const { publicRuntimeConfig } = getConfig();

class GalleryToConditionViewModel {
  private store: GalleryStore;
  private analyticsHandler: AnalyticsHandler;
  readonly goToConditionText: string = 'VIEW IMPERFECTION PHOTOS';
  readonly defaultImage = {
    alt: 'Gallery To Condition Photo',
    src: `${publicRuntimeConfig.BASE_PATH}/modules/inventory/components/gallery/LastGallery.png`,
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
