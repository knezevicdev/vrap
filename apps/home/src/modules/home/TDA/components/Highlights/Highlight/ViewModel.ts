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
        'Multiple inspections. Free CARFAX history report. Complimentary limited warranty.',
      alt: 'High-Quality Vehicles',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/santander/images/highlight-one.png`,
      title: 'High-Quality Vehicles',
    },
    {
      description:
        'No haggling. No hassles. An easy and efficient car buying process - the way it should be.',
      alt: 'Buying Made Easy',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/santander/images/highlight-two.png`,
      title: 'Buying Made Easy',
    },
    {
      description:
        'Get your car or truck shipped to your home or a convenient nearby location.',
      alt: 'Delivered Right to You',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/santander/images/highlight-three.png`,
      title: 'Delivered Right to You',
    },
  ];
}

export default ViewModel;
