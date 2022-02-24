import ViewModel from '../ViewModel';

describe('testing Simple Footer Viewmodel', () => {
  let viewmodel: ViewModel;

  beforeEach(() => {
    viewmodel = new ViewModel();
  });

  it('test readonly var ', () => {
    expect(viewmodel.copyRightMessage).toEqual(
      '©2021 VROOM. ALL RIGHTS RESERVED.'
    );
  });

  it('test getSectionFunction ', () => {
    expect(viewmodel.getSectionLink).toEqual([
      {
        title: 'PRIVACY',
        href: '/legal/privacy-policy',
      },
      {
        title: 'TERMS',
        href: '/legal/terms-of-use',
      },
      {
        title: 'CONTACT',
        href: '/contact',
      },
    ]);
  });
});
