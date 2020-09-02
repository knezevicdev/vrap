interface Link {
  href: string;
  label: string;
}

class DisclaimerViewModel {
  readonly disclaimerText: string =
    'By clicking submit, you consent to receive autodialed marketing calls and text messages from or on behalf of Vroom at the telephone numbers(s) provided above, including your wireless number, if applicable. You understand that consent is not a condition of purchase. Read our ';
  readonly and: string = ' and ';
  readonly privacylink: Link = {
    label: 'Privacy Policy',
    href: '/legal/privacy-policy',
  };
  readonly termslink: Link = {
    label: 'Terms of Use.',
    href: '/legal/terms-of-use',
  };
}

export default DisclaimerViewModel;
