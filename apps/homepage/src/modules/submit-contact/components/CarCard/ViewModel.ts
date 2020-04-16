import { SubmitContactStore } from '../../store';

import globalEnv from 'src/globalEnv';
import { Status } from 'src/networking/types';

class CarCardViewModel {
  private store: SubmitContactStore;

  constructor(store: SubmitContactStore) {
    this.store = store;
  }

  dataReady(): boolean {
    return this.store.vehicleStatus === Status.SUCCESS;
  }

  title(): string {
    const { make, model, year } = this.store.vehicle._source;
    const title = `${year} ${make} ${model}`;
    return title;
  }

  trimLabel(): string {
    const { driveType, trim } = this.store.vehicle._source;
    const trimLabel = trim || driveType;
    return trimLabel;
  }

  private numberWithCommas(x: number): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  mileageLabel(): string {
    const { miles } = this.store.vehicle._source;
    const mileageLabel = `${this.numberWithCommas(miles)} miles`;
    return mileageLabel;
  }

  trimAndMileageLabel(): string {
    return `${this.trimLabel()} | ${this.mileageLabel()}`;
  }

  priceLabel(): string {
    const { listingPrice } = this.store.vehicle._source;
    const priceLabel = `$${this.numberWithCommas(listingPrice)}`;
    return priceLabel;
  }

  imgAlt(): string {
    return `Image of ${this.title()}`;
  }

  imgSrc(): string {
    const defaultImageSrc = `${globalEnv.CDN_URL}/static-rebrand/img/error/no_image.jpg`;
    const { leadPhotoUrl } = this.store.vehicle._source;
    return leadPhotoUrl || defaultImageSrc;
  }
}

export default CarCardViewModel;
