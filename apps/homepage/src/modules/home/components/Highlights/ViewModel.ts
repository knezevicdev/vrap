import Router from 'next/router';

import globalEnv from 'src/globalEnv';

interface Highlight {
  description: string;
  imgAlt: string;
  imgSrc: string;
  title: string;
}

class HighlightsViewModel {
  readonly ctaLabel: string = 'Shop Now';
  readonly highlights: Highlight[] = [
    {
      description:
        'Multiple inspections. Free CARFAX® history report. Complimentary limited\xa0warranty.',
      imgAlt: 'High-Quality Cars',
      imgSrc: `${globalEnv.CDN_URL}/modules/home/highlight-1.png`,
      title: 'High-Quality Cars',
    },
    {
      description:
        'No haggling. No hassles. An easy and efficient car buying process— the way it should be.',
      imgAlt: 'Buying Made Easy',
      imgSrc: `${globalEnv.CDN_URL}/modules/home/highlight-2.png`,
      title: 'Buying Made Easy',
    },
    {
      description:
        'Get your car or truck shipped to your home or a convenient nearby\xa0location.',
      imgAlt: 'Delivered Right to You',
      imgSrc: `${globalEnv.CDN_URL}/modules/home/highlight-3.png`,
      title: 'Delivered Right to You',
    },
  ];

  handleButtonClick(): void {
    Router.push('/cars');
  }
}

export default HighlightsViewModel;
