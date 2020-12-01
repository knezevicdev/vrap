import { FC } from 'react';

import {
  ButtonSection,
  CertifiedSection,
  DeliveredSection,
  TestDriveSection,
  VideoSection,
} from './Sections';

class ValuePropsViewModel {
  sectionOrder: string[] = [
    'video',
    'certified',
    'delivered',
    'test-drive',
    'button',
  ];
  sectionMap: { [slug: string]: FC } = {
    video: VideoSection,
    certified: CertifiedSection,
    delivered: DeliveredSection,
    'test-drive': TestDriveSection,
    button: ButtonSection,
  };
}

export default ValuePropsViewModel;
