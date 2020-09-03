class ContactViewModel {
  readonly title: string = 'Contact Us';
  readonly supportText: string = `We'd be happy to help. Give us a call us at `;
  readonly phoneNumber: string;

  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
}

export default ContactViewModel;
