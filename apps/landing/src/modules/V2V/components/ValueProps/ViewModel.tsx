import { FC } from 'react';

import BuySellTrade from './BuySellTrade';
import {
  CertifiedSection,
  DeliveredSection,
  TestDriveSection,
} from './Sections';

class ValuePropsViewModel {
  constructor(sectionOrderKey: string | null) {
    const { sectionMap } = this;
    if (sectionOrderKey) {
      const validMapping =
        sectionMap[sectionOrderKey as keyof typeof sectionMap];

      if (validMapping) this.sectionOrder = validMapping.order;
    }
  }

  readonly sectionOrder: string[] = [
    'buyselltrade',
    'certified',
    'delivery',
    '7daytestdrive',
  ];

  // a map for mapping components to the slugs in the order array, as well as mapping the order of the sections to passed sectionOrderKey
  sectionMap: { [slug: string]: { component?: FC; order: string[] } } = {
    buyselltrade: {
      component: BuySellTrade,
      order: ['buyselltrade', 'certified', 'delivery', '7daytestdrive'],
    },
    certified: {
      component: CertifiedSection,
      order: ['certified', 'buyselltrade', 'delivery', '7daytestdrive'],
    },
    delivery: {
      component: DeliveredSection,
      order: ['delivery', 'buyselltrade', 'certified', '7daytestdrive'],
    },
    '7daytestdrive': {
      component: TestDriveSection,
      order: ['7daytestdrive', 'buyselltrade', 'certified', 'delivery'],
    },
    // potentially separate component map from section order map
    'delivery-only-exp': {
      order: ['delivery'],
    },
  };
}

export default ValuePropsViewModel;
