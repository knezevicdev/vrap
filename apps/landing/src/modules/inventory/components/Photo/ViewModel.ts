import { InventoryStore } from '../../store/store';

class PhotoViewModel {
  private spinCarUrl?: string | null;
  readonly iFrameNotSupported: string = 'Iframe Not Supported';

  constructor(inventoryStore: InventoryStore) {
    this.spinCarUrl = inventoryStore.vehicle._source.spincarSpinUrl;
  }

  getSpinCarUrl(): string | undefined {
    const options =
      '#hidecarousel!disabledrawer!disableautospin!disablewatermark!hidevehiclehits!stscolor=E7131A%2CFC4349%2CE7131A';
    if (this.spinCarUrl) {
      this.spinCarUrl = this.spinCarUrl.concat(options);
    } else {
      return undefined;
    }
    return this.spinCarUrl;
  }
}

export default PhotoViewModel;
