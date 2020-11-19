import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface Highlight {
  description: string;
  alt: string;
  src: string;
  title: string;
}

class ViewModel {
  readonly highlights: Highlight[] = [
    {
      description:
        'High-quality cars and trucks. Serving Houston for 20+ years.',
      alt: 'High-Quality Vehicles',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/santander/images/highlight-one.png`,
      title: 'Over 200,000 Cars Sold',
    },
    {
      description:
        'Competitive rates and easy financing. A simple and efficient car buying process.',
      alt: 'Buying Made Easy',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/santander/images/highlight-two.png`,
      title: 'Buying Made Easy',
    },
    {
      description:
        'Texas Direct Auto buys all makes and models with any miles, even if the car is not paid off.',
      alt: 'Delivered Right to You',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/santander/images/highlight-three.png`,
      title: 'Sell Us Your Car®',
    },
  ];
}

export default ViewModel;
