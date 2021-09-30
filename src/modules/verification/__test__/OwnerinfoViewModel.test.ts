import ViewModel from '../review/components/OwnerInfoReview/ViewModel';

import store from 'src/store';

describe('Owner Infomation Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.title).toEqual('Contact Information');
    expect(viewModel.primarySectionTitle).toEqual(
      "Primary Owner's Information"
    );
    expect(viewModel.secondarySectionTitle).toEqual(
      "Secondary Owner's Information"
    );
    expect(viewModel.name).toEqual('Name');
    expect(viewModel.email).toEqual('Email');
    expect(viewModel.phone).toEqual('Phone');
    expect(viewModel.address).toEqual('Address');
  });
});
