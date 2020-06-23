import { AnalyticsHandler as BaseAnalyticsHandler } from '@vroom-web/analytics-integration';
import { parseCookies } from 'nookies';

export enum VideoEvent {
  Started = 'Started',
  Paused = 'Paused',
  Completed = 'Completed',
}
export interface VideoProperties {
  contentAssetId: string;
  position: number;
  totalLength: number;
  sound: number;
  quality: string;
  fullScreen: boolean;
}

class AnalyticsHandler extends BaseAnalyticsHandler {
  trackProductSearched(
    label: 'Autocomplete' | 'Free Form',
    query: string
  ): void {
    const event = 'Product Searched';
    const properties = {
      category: 'Home',
      label,
      query,
    };
    this.track(event, properties);
  }

  trackShowNowClicked(): void {
    const event = 'Show Now Clicked';
    const properties = {
      category: 'Home',
    };
    this.track(event, properties);
  }

  trackHowItWorksLearnMoreClicked(): void {
    const event = 'How it Works: Learn More Clicked';
    const properties = {
      category: 'Home',
    };
    this.track(event, properties);
  }

  trackWhoWeAreLearnMoreClicked(): void {
    const event = 'Who we are: Learn More Clicked';
    const properties = {
      category: 'Home',
    };
    this.track(event, properties);
  }

  trackVideoPlayback(kind: VideoEvent, videoProperties: VideoProperties): void {
    const cookies = parseCookies();
    const event = `Video Playback ${kind}`;
    const properties = {
      category: 'Home',
      label: 'How it works video',
      sessionId: cookies.uuid,
      ...videoProperties,
    };
    this.track(event, properties);
  }

  trackWhatIsJuneteenthClicked(): void {
    const event = 'What is Juneteenth Clicked';
    const properties = {
      category: 'Home',
    };
    this.track(event, properties);
  }

  trackWhatIsMyCarWorthClicked(isVin: boolean): void {
    const event = `What's My Car Worth? Clicked`;
    const properties = {
      category: 'Sell',
      label: isVin ? 'Vin' : 'License Plate',
    };
    this.track(event, properties);
  }
}

export default AnalyticsHandler;
