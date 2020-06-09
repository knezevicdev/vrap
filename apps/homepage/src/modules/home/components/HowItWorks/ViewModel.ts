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
}

export default HowItWorksViewModel;
