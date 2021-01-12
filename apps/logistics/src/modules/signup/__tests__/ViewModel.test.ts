import Model from '../Model';
import ViewModel from '../ViewModel';

describe('Signup ViewModel', () => {
  describe('validation', () => {
    test('all fields valid', () => {
      const viewModel = new ViewModel(new Model());

      const firstName = {
        target: { value: 'Hank' },
      } as React.ChangeEvent<HTMLInputElement>;
      const lastName = {
        target: { value: 'Venture' },
      } as React.ChangeEvent<HTMLInputElement>;
      const email = {
        target: { value: 'iambatman@ventureindustries.com' },
      } as React.ChangeEvent<HTMLInputElement>;
      const password = {
        target: { value: 'P@ssw0rd' },
      } as React.ChangeEvent<HTMLInputElement>;
      const passwordConfirm = {
        target: { value: 'P@ssw0rd' },
      } as React.ChangeEvent<HTMLInputElement>;

      viewModel.changeFirst(firstName);
      viewModel.changeLast(lastName);
      viewModel.changeEmail(email);
      viewModel.changePassword(password);
      viewModel.changePasswordConfirm(passwordConfirm);

      expect(viewModel.validation).toEqual({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        passwordConfirm: true,
      });
    });

    test('email invalid', () => {
      const viewModel = new ViewModel(new Model());

      const firstName = {
        target: { value: 'Hank' },
      } as React.ChangeEvent<HTMLInputElement>;
      const lastName = {
        target: { value: 'Venture' },
      } as React.ChangeEvent<HTMLInputElement>;
      const email = {
        target: { value: 'iambatman@ventureindustries' },
      } as React.ChangeEvent<HTMLInputElement>;
      const password = {
        target: { value: 'P@ssw0rd' },
      } as React.ChangeEvent<HTMLInputElement>;
      const passwordConfirm = {
        target: { value: 'P@ssw0rd' },
      } as React.ChangeEvent<HTMLInputElement>;

      viewModel.changeFirst(firstName);
      viewModel.changeLast(lastName);
      viewModel.changeEmail(email);
      viewModel.changePassword(password);
      viewModel.changePasswordConfirm(passwordConfirm);

      expect(viewModel.validation).toEqual({
        firstName: true,
        lastName: true,
        email: false,
        password: true,
        passwordConfirm: true,
      });
    });

    test('password invalid', () => {
      const viewModel = new ViewModel(new Model());

      const firstName = {
        target: { value: 'Hank' },
      } as React.ChangeEvent<HTMLInputElement>;
      const lastName = {
        target: { value: 'Venture' },
      } as React.ChangeEvent<HTMLInputElement>;
      const email = {
        target: { value: 'iambatman@ventureindustries.com' },
      } as React.ChangeEvent<HTMLInputElement>;
      const password = {
        target: { value: 'Password1' },
      } as React.ChangeEvent<HTMLInputElement>;
      const passwordConfirm = {
        target: { value: 'Password1' },
      } as React.ChangeEvent<HTMLInputElement>;

      viewModel.changeFirst(firstName);
      viewModel.changeLast(lastName);
      viewModel.changeEmail(email);
      viewModel.changePassword(password);
      viewModel.changePasswordConfirm(passwordConfirm);

      expect(viewModel.validation).toEqual({
        firstName: true,
        lastName: true,
        email: true,
        password: false,
        passwordConfirm: false,
      });
    });

    test('password confirm invalid', () => {
      const viewModel = new ViewModel(new Model());

      const firstName = {
        target: { value: 'Hank' },
      } as React.ChangeEvent<HTMLInputElement>;
      const lastName = {
        target: { value: 'Venture' },
      } as React.ChangeEvent<HTMLInputElement>;
      const email = {
        target: { value: 'iambatman@ventureindustries.com' },
      } as React.ChangeEvent<HTMLInputElement>;
      const password = {
        target: { value: 'P@ssword1' },
      } as React.ChangeEvent<HTMLInputElement>;
      const passwordConfirm = {
        target: { value: 'P@ssword' },
      } as React.ChangeEvent<HTMLInputElement>;

      viewModel.changeFirst(firstName);
      viewModel.changeLast(lastName);
      viewModel.changeEmail(email);
      viewModel.changePassword(password);
      viewModel.changePasswordConfirm(passwordConfirm);

      expect(viewModel.validation).toEqual({
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        passwordConfirm: false,
      });
    });
  });
});
