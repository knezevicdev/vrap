import getConfig from 'next/config';

const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

class HeroViewModel {
  readonly picture = {
    alt: 'Jeep',
    src: `${BASE_PATH}/images/Hero-Jeep-image.png`,
    width: 'auto',
    aspectRatio: '960:720',
  };
  readonly title = 'Jeep Wrangler';
}

export default HeroViewModel;
