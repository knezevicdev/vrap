import ViewModel from '../ViewModel';

describe('testing Tool Footer Viewmodel', () => {
  let viewmodel: ViewModel;
  beforeEach(() => {
    viewmodel = new ViewModel();
  });

  it('test readonly value', () => {
    expect(viewmodel.copyrightMessage).toEqual(
      '©2020 VROOM. ALL RIGHTS RESERVED.'
    );
    expect(viewmodel.vroomLink).toEqual('https://www.vroom.com/');

    expect(viewmodel.phoneNumber).toEqual({
      name: '(855) 524-1300',
      href: 'tel:+18555241300',
    });
    expect(viewmodel.privacy).toEqual({
      href: '/legal/privacy-policy',
      name: 'Privacy Policy',
    });
    expect(viewmodel.terms).toEqual({
      href: '/legal/terms-of-use',
      name: 'Terms of use',
    });
  });
});
