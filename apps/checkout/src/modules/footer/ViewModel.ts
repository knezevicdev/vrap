
class FooterViewModel {
  readonly title: string = 'welcome back';
 

  readonly register = {
    initialText: `Don't have a Vroom account?`,
    text: 'Join',
    href: '/account/register',
  };

  readonly forgotPassword = {
    text: 'Forgot Password?',
    href: '/forgot-password',
  };
 
}

export default FooterViewModel;
