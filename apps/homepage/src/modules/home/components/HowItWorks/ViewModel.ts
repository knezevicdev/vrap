import globalEnv from 'src/globalEnv';

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
    label: 'LEARN MORE ABOUT VROOM',
  };
  readonly video: Video = {
    src: `${globalEnv.CDN_URL}/modules/home/videos/how-it-works-promo.mp4`,
    poster: {
      default: `${globalEnv.CDN_URL}/modules/home/images/how-it-works-poster.png`,
      jpeg2000: `${globalEnv.CDN_URL}/modules/home/images/jp2/how-it-works-poster.jp2`,
      webp: `${globalEnv.CDN_URL}/modules/home/images/webp/how-it-works-poster.webp`,
    },
  };

  getPoster(): string {
    const jpeg2000 = window.Modernizr.jpeg2000;
    const webp = Object.values(window.Modernizr.webp).indexOf(false) === -1;
    if (jpeg2000) {
      return this.video.poster.jpeg2000;
    }
    if (webp) {
      return this.video.poster.webp;
    }
    return this.video.poster.default;
  }
}

export default HowItWorksViewModel;
