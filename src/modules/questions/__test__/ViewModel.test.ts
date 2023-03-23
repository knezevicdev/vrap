import ViewModel from '../ViewModel';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('test questions ViewModel', () => {
  const viewModel = new ViewModel();

  it('test contents', () => {
    expect(viewModel.questions).toEqual('Questions?');
    expect(viewModel.helpCenter).toEqual('VISIT OUR HELP CENTER');
    expect(viewModel.sendMessage).toEqual('SEND A MESSAGE');
    expect(viewModel.phoneNumber).toEqual('(855) 524-1300');
    expect(viewModel.faqLink).toEqual('/contact');
    expect(viewModel.emailLink).toEqual('/contact');
    expect(viewModel.phoneLink).toEqual(`tel:1-(855)-524-1300`);
  });
});
