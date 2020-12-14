import { FC } from 'react';

import {
  ButtonSection,
  CertifiedSection,
  DeliveredSection,
  TestDriveSection,
} from './Sections';
import BuySellTrade from './BuySellTrade';

class ValuePropsViewModel {
  sectionOrder: string[] = [
    'video',
    'certified',
    'delivered',
    'test-drive',
    'button',
  ];
  sectionMap: { [slug: string]: FC } = {
    video: BuySellTrade,
    certified: CertifiedSection,
    delivered: DeliveredSection,
    'test-drive': TestDriveSection,
    button: ButtonSection,
  };
}

export default ValuePropsViewModel;
