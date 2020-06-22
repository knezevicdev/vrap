import { GallerySelections, GalleryStore } from '../../store';

import globalEnv from 'src/globalEnv';

class GalleryConditionEndViewModel {
  private store: GalleryStore;
  readonly goToConditionText: string = 'VIEW IMPERFECTIONS PHOTOS';
  readonly faqPreText: string =
    'For information on our mechanical and safety standards, ';
  readonly faqLink = {
    text: 'please visit our FAQ.',
    url: `https://vroom.zendesk.com/hc/en-us/articles/205360495-How-do-you-ensure-the-quality-of-your-vehicles-`,
  };
  readonly defaultImage = {
    alt: 'Condition End Photo',
    src: `${globalEnv.CDN_URL}/modules/inventory/components/gallery/LastGallery.png`,
  };

  constructor(inventoryStore: GalleryStore) {
    this.store = inventoryStore;
  }

  goToCondition = (): void => {
    this.store.changeSelectedGallery(GallerySelections.DEFECTS);
  };
}

export default GalleryConditionEndViewModel;
