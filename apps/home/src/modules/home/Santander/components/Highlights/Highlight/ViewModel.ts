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
      description: 'Competitive rates and flexible terms to meet your needs.',
      alt: 'Flexible Financing',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/santander/images/highlight-two.png`,
      title: 'Flexible Financing',
    },
    {
      description:
        'Purchase online with haggle-free pricing, then have your car shipped to home or a convenient nearby location.',
      alt: 'Buying Made Easy',
      src: `${publicRuntimeConfig.BASE_PATH}/modules/home/santander/images/highlight-three.png`,
      title: 'Buying Made Easy',
    },
  ];
}

export default ViewModel;
