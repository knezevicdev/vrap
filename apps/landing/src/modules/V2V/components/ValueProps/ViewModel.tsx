import { FC } from 'react';

import BuySellTrade from './BuySellTrade';
import {
  CertifiedSection,
  DeliveredSection,
  RoadsideSection,
  TestDriveSection,
} from './Sections';

class ValuePropsViewModel {
  constructor(sectionOrderKey: string | null) {
    const { sectionOrderMap } = this;
    if (sectionOrderKey) {
      const validMapping =
        sectionOrderMap[sectionOrderKey as keyof typeof sectionOrderMap];

      if (validMapping) this.sectionOrder = validMapping;
    }
  }

  readonly sectionOrder: string[] = [
    'buyselltrade',
    'certified',
    'delivery',
    '7daytestdrive',
    'roadside',
  ];

  // a map for mapping components to the slugs in the order array, as well as mapping the order of the sections to passed sectionOrderKey
  componentMap: { [slug: string]: FC } = {
    buyselltrade: BuySellTrade,
    certified: CertifiedSection,
    delivery: DeliveredSection,
    '7daytestdrive': TestDriveSection,
    roadside: RoadsideSection,
  };

  // a map of orders, based on an order key that is passed via query param
  sectionOrderMap: { [slug: string]: string[] } = {
    buyselltrade: [
      'buyselltrade',
      'certified',
      'delivery',
      '7daytestdrive',
      'roadside',
    ],
    certified: [
      'certified',
      'buyselltrade',
      'delivery',
      '7daytestdrive',
      'roadside',
    ],
    delivery: [
      'delivery',
      'buyselltrade',
      'certified',
      '7daytestdrive',
      'roadside',
    ],
    '7daytestdrive': [
      '7daytestdrive',
      'buyselltrade',
      'certified',
      'delivery',
      'roadside',
    ],
    'delivery-only-exp': ['delivery'],
  };
}

export default ValuePropsViewModel;
