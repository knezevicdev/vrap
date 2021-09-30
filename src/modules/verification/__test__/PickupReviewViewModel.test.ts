import ViewModel from '../review/components/PickupInfoReview/ViewModel';

import store from 'src/store';

describe('Pickup Infomation Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.pickUpInfotitle).toEqual('Pick Up Information');
    expect(viewModel.pickUpAddress).toEqual('Pick up address');
    expect(viewModel.contactInformation).toEqual('Contact Information');
    expect(viewModel.name).toEqual('Name');
    expect(viewModel.email).toEqual('Email');
    expect(viewModel.phoneNumber).toEqual('Phone Number');
  });
});
