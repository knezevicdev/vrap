import { GallerySelections, InventoryStore } from '../../store';

import globalEnv from 'src/globalEnv';

class GalleryConditionEndViewModel {
  private store: InventoryStore;
  readonly goToConditionText: string = 'VIEW IMPERFEFTION PHOTOS';
  readonly faqPreText: string =
    'For information on our mechanical and safety standards, ';
  readonly faqLink = {
    text: 'please visit out FAQ.',
    url: `https://vroom.zendesk.com/hc/en-us/articles/205360495-How-do-you-ensure-the-quality-of-your-vehicles-`,
  };
  readonly defaultImage = {
    alt: 'Condition End Photo',
    src: `${globalEnv.CDN_URL}/components/LastGallery.png`,
  };

  constructor(inventoryStore: InventoryStore) {
    this.store = inventoryStore;
  }

  goToCondition = (): void => {
    this.store.changeSelectedGallery(GallerySelections.DEFECTS);
  };
}

export default GalleryConditionEndViewModel;
