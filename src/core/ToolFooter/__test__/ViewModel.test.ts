import ViewModel from '../ViewModel';

describe('testing Tool Footer Viewmodel', () => {
  let viewmodel: ViewModel;
  beforeEach(() => {
    viewmodel = new ViewModel();
  });

  it('test readonly value', () => {
    expect(viewmodel.phoneNumber).toEqual({
      name: '(855) 524-1300',
      href: 'tel:+18555241300',
    });
  });
});
