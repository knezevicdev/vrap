import store from '../../../../../../store';
import ViewModel from '../ViewModel';

describe('Pickup Infomation Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.SellDoctitle).toEqual('Document Upload');
    expect(viewModel.frontTitle).toEqual('Front of Title Information');
    expect(viewModel.backTitle).toEqual('Back of Title Information');
    expect(viewModel.lienRelease).toEqual('Lien Release Letter');
    expect(viewModel.exactMileage).toEqual('Exact Mileage');
    expect(viewModel.dlFront).toEqual("Front of Driver's License");
    expect(viewModel.dlBack).toEqual("Back of Driver's License");
    expect(viewModel.secondDlFront).toEqual(
      "Front of Second Owner's Driver's License"
    );
    expect(viewModel.secondDlBack).toEqual(
      "Back of Second Owner's Driver's License"
    );
    expect(viewModel.tiFront).toEqual('Front of Title Information');
    expect(viewModel.tiBack).toEqual('Back of Title Information');
    expect(viewModel.registration).toEqual('Registration');
    expect(viewModel.odometer).toEqual('Odometer Picture');
  });
});
