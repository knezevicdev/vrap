import { FC } from 'react';

import {
  ButtonSection,
  CertifiedSection,
  DeliveredSection,
  TestDriveSection,
  VideoSection,
} from './Sections';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';

interface Props {
  viewModel: ValuePropsViewModel;
}

class ValuePropsViewModel {
  sectionOrder: string[] = [
    'video',
    'certified',
    'delivered',
    'test-drive',
    'button',
  ];
  sectionMap: { [slug: string]: FC<Props> } = {
    video: VideoSection,
    certified: CertifiedSection,
    delivered: DeliveredSection,
    'test-drive': TestDriveSection,
    button: ButtonSection,
  };

  private analyticsHandler: AnalyticsHandler;

  constructor() {
    this.analyticsHandler = new AnalyticsHandler();
  }

  handleCertificateLinkClick(): void {
    this.analyticsHandler.trackCertificationLinkClicked();
  }

  handleLearnMoreClick(): void {
    this.analyticsHandler.trackLearnMoreClicked();
    window.location.href =
      'https://vroom.zendesk.com/hc/en-us/articles/205360565-When-does-the-7-day-return-period-begin-';
  }
}

export default ValuePropsViewModel;
