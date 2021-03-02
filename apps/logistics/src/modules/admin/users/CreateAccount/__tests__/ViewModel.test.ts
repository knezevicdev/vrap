import UsersModel from '../../Model';
import ViewModel from '../ViewModel';

describe('CreateAccount ViewModel', () => {
  describe('email', () => {
    test('set/get email', () => {
      const viewModel = new ViewModel(new UsersModel());
      viewModel.email = 'bugs.bunny@acme.com';
      expect(viewModel.email).toEqual('bugs.bunny@acme.com');
    });

    test('valid email', () => {
      const viewModel = new ViewModel(new UsersModel());
      viewModel.email = 'bugs.bunny@acme.com';
      expect(viewModel.disabled).toEqual(false);
    });

    test('invalid email', () => {
      const viewModel = new ViewModel(new UsersModel());
      viewModel.email = 'bugs.bunnyacme.com';
      expect(viewModel.disabled).toEqual(true);
      viewModel.email = 'bugs.bunny@.com';
      expect(viewModel.disabled).toEqual(true);
      viewModel.email = 'bugs.bunny@acme.';
      expect(viewModel.disabled).toEqual(true);
      viewModel.email = '@acme.com';
      expect(viewModel.disabled).toEqual(true);
    });
  });
});
