import getConfig from 'next/config';
import { stringify } from 'qs';

import AnalyticsHandler, {
  VideoEvent,
  VideoProperties,
} from 'src/integrations/AnalyticsHandler';
import { HomeStore } from 'src/modules/home/store';

const { publicRuntimeConfig } = getConfig();

interface Link {
  label: string;
  href: string;
}

interface Video {
  src: string;
  poster: string;
}

class HowItWorksViewModel {
  readonly title: string = 'how it works';
  readonly subtitle: string =
    'Vroom is changing the way people buy, sell, and trade in cars. Here’s a step-by-step guide on what\xa0to\xa0expect.';
  readonly link: Link;
  readonly video: Video = {
    src: `${publicRuntimeConfig.VROOM_URL}/static-assets/videos/how-it-works-promo.mp4`,
    poster: `${publicRuntimeConfig.VROOM_URL}/static-assets/images/how-it-works-poster.png`,
  };

  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(store: HomeStore) {
    // FIT-566
    // Persist query string across navigation.
    // This allows vlassic attributuion to work until we can implement a better system.
    const queryString = stringify(store.query, {
      addQueryPrefix: true,
    });
    this.link = {
      href: `/how-it-works${queryString}`,
      label: 'LEARN MORE ABOUT VROOM',
    };
  }

  handleLearnMoreClick(): void {
    this.analyticsHandler.trackHowItWorksLearnMoreClicked();
  }

  handleVideoClick(target: EventTarget & HTMLVideoElement): void {
    const { currentTime, currentSrc, duration, volume } = target;
    const properties: VideoProperties = {
      contentAssetId: currentSrc,
      position: currentTime,
      totalLength: Math.round(duration),
      sound: Math.round(volume * 100),
      quality: '1080p',
      fullScreen: window.innerHeight === screen.height,
    };

    if (target.currentTime === 0) {
      this.analyticsHandler.trackVideoPlayback(VideoEvent.Started, properties);
      return;
    }

    if (target.currentTime === target.duration) {
      this.analyticsHandler.trackVideoPlayback(
        VideoEvent.Completed,
        properties
      );
      return;
    }

    if (target.paused) {
      this.analyticsHandler.trackVideoPlayback(VideoEvent.Paused, properties);
      return;
    }
  }
}

export default HowItWorksViewModel;
