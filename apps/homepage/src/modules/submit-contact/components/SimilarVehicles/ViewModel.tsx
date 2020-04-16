import Router from 'next/router';

import { SubmitContactStore } from '../../store';

import { Status } from 'src/networking/types';

export interface Summary {
  vin: string;
  imgUrl: string;
  link: string;
  ymm: string;
  trim: string;
  miles: string;
  price: string;
}

interface Link {
  label: string;
  href: string;
}

class SimilarVehiclesViewModel {
  private store: SubmitContactStore;

  readonly errorButtonLabel: string = 'View All Cars';
  readonly title: string = 'Similar Vehicles';
  readonly link: Link = {
    label: 'View All',
    href: '/cars',
  };

  constructor(store: SubmitContactStore) {
    this.store = store;
  }

  loading(): boolean {
    const result =
      this.store.similarStatus === Status.FETCHING ||
      this.store.similarStatus === Status.INITIAL;
    return result;
  }

  ready(): boolean {
    const result = this.store.similarStatus === Status.SUCCESS;
    return result;
  }

  error(): boolean {
    return this.store.similarStatus === Status.ERROR;
  }

  getSummaries(): Summary[] {
    return this.store.similar.map(i => {
      const {
        vin,
        leadPhotoUrl,
        leadFlagPhotoUrl,
        year,
        make,
        model,
        trim,
        miles,
        listingPrice,
      } = i._source;
      return {
        vin,
        imgUrl: leadFlagPhotoUrl || leadPhotoUrl,
        link: `/inventory/${vin}`,
        ymm: `${year} ${make} ${model}`,
        trim,
        miles: `${miles.toLocaleString('en-US')} miles`,
        price: `$${listingPrice.toLocaleString('en-US')}`,
      };
    });
  }

  handleErrorButtonClick(): void {
    Router.push('/cars');
  }

  handleCarCardClick(summary: Summary): void {
    Router.push(summary.link);
  }
}

export default SimilarVehiclesViewModel;
