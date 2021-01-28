import { FormValues } from './types';

class LoginViewModel {
  readonly title: string = 'welcome back';
  readonly initValues: FormValues = {
    username: '',
    password: ''
  };

  readonly register = {
    initialText: `Don't have a Vroom account?`,
    text: 'Join',
    href: '/account/register',
  };

  readonly forgotPassword = {
    text: 'Forgot Password?',
    href: '/forgot-password',
  };

  handleSubmit = (values: FormValues): void => {
    alert(JSON.stringify(values, null, 2));
  };
}

export default LoginViewModel;
