import ViewModel from './ViewModel';

describe('Highlights ViewModel', () => {
  test('strings on class', () => {
    const vm = new ViewModel();
    expect(vm.ctaLabel).toBe('Shop Now');
    expect(vm.highlights).toEqual([
      {
        description:
          'Multiple inspections. Free CARFAX® history report. Complimentary limited\xa0warranty.',
        imgAlt: 'High-Quality Cars',
        imgSrc: `http:testhost.com/modules/home/highlight-1.png`,
        title: 'High-Quality Cars',
      },
      {
        description:
          'No haggling. No hassles. An easy and efficient car buying process— the way it should be.',
        imgAlt: 'Buying Made Easy',
        imgSrc: `http:testhost.com/modules/home/highlight-2.png`,
        title: 'Buying Made Easy',
      },
      {
        description:
          'Get your car or truck shipped to your home or a convenient nearby\xa0location.',
        imgAlt: 'Delivered Right to You',
        imgSrc: `http:testhost.com/modules/home/highlight-3.png`,
        title: 'Delivered Right to You',
      },
    ]);
  });
});
