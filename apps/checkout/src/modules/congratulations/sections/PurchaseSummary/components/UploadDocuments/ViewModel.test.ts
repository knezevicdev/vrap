import ViewModel from './ViewModel';

describe('Upload Documents View Model Test', () => {
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel([], false);
  });

  describe('Test Get File Name', () => {
    it('should return the right file name', () => {
      let filename = viewModel.getFileName('drivers-license-front');
      expect(filename).toEqual('Front of Driver License');

      filename = viewModel.getFileName('drivers-license-back');
      expect(filename).toEqual('Back of Driver License');

      filename = viewModel.getFileName('insurance');
      expect(filename).toEqual('Insurance Card');

      filename = viewModel.getFileName('front-of-co-buyer-id');
      expect(filename).toEqual('Front of Co-buyer ID');

      filename = viewModel.getFileName('back-of-co-buyer-id');
      expect(filename).toEqual('Back of Co-buyer ID');

      filename = viewModel.getFileName('front-of-trade-title');
      expect(filename).toEqual('Front of Trade Title');

      filename = viewModel.getFileName('back-of-trade-title');
      expect(filename).toEqual('Back of Trade Title');

      filename = viewModel.getFileName('photo-of-trade-odometer');
      expect(filename).toEqual('Photo of Trade Odometer');

      filename = viewModel.getFileName('proof-of-trade-odometer');
      expect(filename).toEqual('Proof of Trade Odometer');

      filename = viewModel.getFileName('proof-of-income-1');
      expect(filename).toEqual('Proof of Income 1');

      filename = viewModel.getFileName('proof-of-income-2');
      expect(filename).toEqual('Proof of Income 2');

      filename = viewModel.getFileName('proof-of-income-3');
      expect(filename).toEqual('Proof of Income 3');

      filename = viewModel.getFileName('proof-of-phone');
      expect(filename).toEqual('Proof of Phone');

      filename = viewModel.getFileName('proof-of-residence');
      expect(filename).toEqual('Proof of Residence');

      filename = viewModel.getFileName('references');
      expect(filename).toEqual('References');

      filename = viewModel.getFileName('vehicle-registration');
      expect(filename).toEqual('Vehicle Registration');

      filename = viewModel.getFileName('some-new-document-added');
      expect(filename).toEqual('some-new-document-added');
    });
  });
});
