import { Car } from '@vroom-web/inv-search-networking';

import { InventoryStore } from '../../store/inventoryStore';

interface Image {
  url: string;
  alt: string;
}

class PhotoViewModel {
  private car: Car;
  readonly iFrameNotSupported: string = 'Iframe Not Supported';

  constructor(inventoryStore: InventoryStore) {
    this.car = inventoryStore.vehicle._source;
  }

  getSpinCarUrl(): string | undefined {
    const spinUrl = this.car.spincarSpinUrl;
    const options =
      '#hidecarousel!disabledrawer!disableautospin!disablewatermark!hidevehiclehits!stscolor=E7131A%2CFC4349%2CE7131A';
    if (spinUrl) {
      return spinUrl.concat(options);
    } else {
      return undefined;
    }
  }

  getImageUrl(): Image {
    const { leadFlagPhotoUrl, make, model, year } = this.car;
    return {
      url: leadFlagPhotoUrl,
      alt: `${make} ${model} ${year}`,
    };
  }
}

export default PhotoViewModel;
