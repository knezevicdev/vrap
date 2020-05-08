import globalEnv from 'src/globalEnv';

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
  readonly link: Link = {
    href: '/how-it-works',
    label: 'LEARN MORE',
  };
  readonly video: Video = {
    src: `${globalEnv.CDN_URL}/modules/home/how-it-works-promo.mp4`,
    poster: `${globalEnv.CDN_URL}/modules/home/how-it-works-poster.png`,
  };
}

export default HowItWorksViewModel;
