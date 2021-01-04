/* eslint-disable @typescript-eslint/camelcase */
import { Car, SoldStatusInt } from '@vroom-web/inv-search-networking';
import getConfig from 'next/config';

import AnalyticsHandler, {
  Product,
  ProductPhotoType,
} from 'src/integrations/AnalyticsHandler';
import { CarsStore } from 'src/modules/cars/store';

const { publicRuntimeConfig } = getConfig();

interface Summary {
  image: string;
  title: string;
  trim: string;
  miles: string;
  price: string;
}

class CarCardViewModel {
  private analyticsHandler: AnalyticsHandler;
  private readonly carsStore: CarsStore;
  private readonly car: Car;
  private readonly position: number;
  readonly evoxLogo = {
    alt: 'Evox Images',
    src: `${publicRuntimeConfig.BASE_PATH}/components/evox-logo.png`,
  };
  readonly availableSoon: string = 'Available Soon';
  readonly salePending: string = 'Sale Pending';
  readonly testDrive: string = 'Test Drive';

  // DELTA-228 this list of test drive zones was copied from the vroom-com codebase.
  // TODO: move this list/logic to the backend.
  // https://docs.google.com/spreadsheets/d/1PzaVuOwJyMhWU2qHtDFU-itX62zWbxTolhSHhsGUS8k/edit#gid=2054247164
  readonly zonesWithTestDrive = [
    'blq',
    'blr',
    'bls',
    'blt',
    'blu',
    'blv',
    'brownlot1',
    'brownlot2',
    'brownlot3',
    'centralpark',
    'customerparking',
    'deliverylane',
    'ez-1',
    'ez-10',
    'ez-11',
    'ez-12',
    'ez-13',
    'ez-14',
    'ez-15',
    'ez-16',
    'ez-17',
    'ez-18',
    'ez-19',
    'ez-2',
    'ez-20',
    'ez-21',
    'ez-22',
    'ez-23',
    'ez-24',
    'ez-25',
    'ez-26',
    'ez-27',
    'ez-28',
    'ez-3',
    'ez-4',
    'ez-5',
    'ez-6',
    'ez-7',
    'ez-8',
    'ez-9',
    'entertdaalot',
    'flightdeck',
    'frontcanopy',
    'garage2',
    'garage3',
    'garage4',
    'garage5',
    'gri',
    'grl',
    'grm',
    'grn',
    'gro',
    'grp',
    'gs-garage',
    'gs-storage/90',
    'hanger-03',
    'hanger-05',
    'hanger-08',
    'hanger-11',
    'hanger-14',
    'hanger-15',
    'hanger-16',
    'hanger-18',
    'hotshot!',
    'orq',
    'orr',
    'ors',
    'ort',
    'orv',
    'orw',
    'orz',
    'parkingunknown!',
    'r-ab',
    'r-awesomeloop',
    'r-awesomequeue',
    'r-awesomewasher',
    'r-bc',
    'r-booth1',
    'r-booth2',
    'r-booth3',
    'r-booth4',
    'r-booth6',
    'r-cd',
    'r-ef',
    'r-enterdoor1',
    'r-enterdoor5',
    'r-exitdoor1',
    'r-exitdoor10',
    'r-exitdoor6',
    'r-exitdoor7',
    'r-exitdoor8',
    'r-exitdoor9',
    'r-exittdaalot',
    'r-fg',
    'r-gh',
    'r-hi',
    'r-ij',
    'r-jk',
    'r-kl',
    'r-lm',
    'r-loadingdock',
    'r-newcars',
    'r-outboundbody',
    'r-outboundcorral',
    'r-outbounddealer',
    'r-recon-dent',
    'r-recon-interior',
    'r-recon-onsitefinishing',
    'r-recon-windshield',
    'r-retailservice',
    'r-servicedrive',
    'r-tdac-bay1',
    'r-tdac-bay2',
    'r-tdac-bay3',
    'r-tdac-bay4',
    'r-tdac-bay5',
    'r-tdac-hfp',
    'r-terminal',
    'r-tires',
    'r-wheelrepair',
    'rda',
    'rdb',
    'rdc',
    'rdd',
    'rde',
    'rdf',
    'rdg',
    'rdh',
    'showroom',
    'tz-1',
    'tz-10',
    'tz-2',
    'tz-3',
    'tz-4',
    'tz-5',
    'tz-6',
    'tz-7',
    'tz-8',
    'tz-9',
    'terminal-completed',
    'testdriveq',
    'transferatawesome',
    'yea',
    'yeb',
    'yec',
    'yed',
    'yee',
    'yef',
    'yeg',
    'yeh',
  ];

  constructor(carsStore: CarsStore, car: Car, position: number) {
    this.analyticsHandler = new AnalyticsHandler();
    this.carsStore = carsStore;
    this.car = car;
    this.position = position;
  }

  private getPhotoType(): ProductPhotoType {
    const { hasStockPhotos, leadFlagPhotoUrl } = this.car;
    if (hasStockPhotos) {
      return 'Stock';
    }
    if (leadFlagPhotoUrl) {
      return 'Vroom';
    }
    return 'Illustration';
  }

  showLogo = (): boolean => {
    // FIT-445 this logic should only need to check whether "hasStockPhotos" is true.
    // However, the backend is returning cars where that field is true, even though there aren't any photos.
    // For now, we're checking that "leadFlagPhotoUrl" exists so we don't display a logo if there aren't any photos.
    // Eventually, the backend data should be fixed and this can simply use "hasStockPhotos".
    return !!this.car.leadFlagPhotoUrl && this.car.hasStockPhotos;
  };

  showAvailableSoon = (): boolean => {
    /* TODO
    Replace once the backend team release a new flag.
    From David - the intention is to add an availableSoon flag ASAP
    */
    return this.car.leadFlagPhotoUrl === '' || this.car.hasStockPhotos;
  };

  showSalePending = (): boolean => {
    return (
      !this.showAvailableSoon() &&
      this.car.soldStatus === SoldStatusInt.SALE_PENDING
    );
  };

  zoneAllowsTestDrive = (zone: string): boolean => {
    if (!zone) {
      return false;
    }
    const formattedZone = zone.toLowerCase().replace(/\s/g, '');
    return this.zonesWithTestDrive.includes(formattedZone);
  };

  showTestDrive = (): boolean => {
    return (
      !this.showSalePending() &&
      !this.showAvailableSoon() &&
      this.zoneAllowsTestDrive(this.car.zone)
    );
  };

  getPhotoStyle = (): { opacity: string } => {
    const { leadFlagPhotoUrl } = this.car;

    const opacity = leadFlagPhotoUrl ? '100%' : '30%';
    return { opacity: opacity };
  };

  getSummary(): Summary {
    const {
      leadFlagPhotoUrl,
      year,
      make,
      model,
      trim,
      miles,
      listingPrice,
    } = this.car;

    const noPhoto = `${publicRuntimeConfig.BASE_PATH}/components/ghost-suv-with-padding.png`;
    const image = leadFlagPhotoUrl || noPhoto;

    return {
      image: image,
      title: `${year} ${make} ${model}`,
      trim,
      miles: `${miles.toLocaleString('en-US')} miles`,
      price: `$${listingPrice.toLocaleString('en-US')}`,
    };
  }

  link(): string {
    // FIT-583
    // Persist key attribution query params across navigation.
    // This is a stopgap so that vlassic attributuion works.
    // TODO: We should come back and remove this when a better attribution system is in place.
    const attributionQueryString =
      this.carsStore.attributionQueryString !== ''
        ? `?${this.carsStore.attributionQueryString}`
        : '';
    const { makeSlug, modelSlug, vin, year } = this.car;

    return `/inventory/${makeSlug}-${modelSlug}-${year}-${vin}${attributionQueryString}`;
  }

  trackProductClick = (): void => {
    const {
      consignmentPartnerId,
      inventoryId,
      leadFlagPhotoUrl,
      year,
      make,
      model,
      listingPrice,
      vin,
      soldStatus,
    } = this.car;
    const name = `${year} ${make} ${model}`;
    const photoType = this.getPhotoType();
    const product: Product = {
      imageUrl: leadFlagPhotoUrl,
      inventoryType: consignmentPartnerId ? 'Consignment' : 'Vroom',
      make,
      model,
      name,
      partnerId: consignmentPartnerId,
      photoType,
      price: listingPrice,
      sku: inventoryId,
      soldStatus,
      url: this.link(),
      vin,
      year,
      position: this.position,
    };
    this.analyticsHandler.trackProductClicked(product);
  };
}

export default CarCardViewModel;
