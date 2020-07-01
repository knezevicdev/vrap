import globalEnv from 'src/globalEnv';
import AnalyticsHandler, {
  VideoEvent,
  VideoProperties,
} from 'src/integrations/AnalyticsHandler';
import { showDefaultVariant } from 'src/integrations/experimentSDK';
import { HomeStore } from 'src/modules/home/store';

interface Link {
  label: string;
  href: string;
}

interface Video {
  src: string;
  poster: {
    default: string;
    jpeg2000: string;
    webp: string;
  };
}

class HowItWorksViewModel {
  readonly title: string = 'how it works';
  readonly subtitle: string =
    'Vroom is changing the way people buy, sell, and trade in cars. Here’s a step-by-step guide on what\xa0to\xa0expect.';
  readonly link: Link = {
    href: '/how-it-works',
    label: '',
  };
  readonly video: Video = {
    src: `${globalEnv.ASSET_PREFIX}/modules/home/videos/how-it-works-promo.mp4`,
    poster: {
      default: `${globalEnv.ASSET_PREFIX}/modules/home/images/how-it-works-poster.png`,
      jpeg2000: `${globalEnv.ASSET_PREFIX}/modules/home/images/jp2/how-it-works-poster.jp2`,
      webp: `${globalEnv.ASSET_PREFIX}/modules/home/images/webp/how-it-works-poster.webp`,
    },
  };

  private analyticsHandler: AnalyticsHandler = new AnalyticsHandler();

  constructor(store: HomeStore) {
    const learnMoreLinkLabelExperimentVariant = showDefaultVariant(
      'snd-homepage-learn-more-vs-learn-more-about-vroom',
      store.experiments,
      store.query
    );
    this.link.label = learnMoreLinkLabelExperimentVariant
      ? 'LEARN MORE ABOUT VROOM'
      : 'BUYING AND SELLING MADE EASY';
  }

  getPoster(): string {
    const jpeg2000 = window.Modernizr.jpeg2000;

    const webp =
      typeof window.Modernizr.webp === 'boolean'
        ? window.Modernizr.webp
        : Object.values(window.Modernizr.webp).indexOf(false) === -1;

    if (jpeg2000) {
      return this.video.poster.jpeg2000;
    }
    if (webp) {
      return this.video.poster.webp;
    }
    return this.video.poster.default;
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
