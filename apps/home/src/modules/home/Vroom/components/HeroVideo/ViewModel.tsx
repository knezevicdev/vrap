import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface Video {
  src: string;
  poster: string;
}

class HeroViewModel {
  readonly title: string = `Never go to a 
  dealership again`;
  readonly subtitle: string = `Buy or sell your car on Vroom, and 
    we’ll deliver or pick it up contact-free.`;
  readonly bgVideo: Video = {
    src: `${publicRuntimeConfig.STATIC_ASSETS_HOST_URL}/vroom/videos/hero-background-video.mp4`,
    poster: `${publicRuntimeConfig.STATIC_ASSETS_HOST_URL}/vroom/images/fallback-hero-background.jpg`,
  };
}

export default HeroViewModel;
