class ViewModel {
  readonly questions: string = 'Questions?';
  readonly helpCenter: string = 'VISIT OUR HELP CENTER';
  readonly sendMessage: string = 'SEND A MESSAGE';
  readonly phoneNumber: string = '(855) 524-1300';

  readonly faqLink: string = 'https://vroom.zendesk.com/hc/en-us';
  readonly emailLink: string = '/contact';
  readonly phoneLink: string = `tel:1-${this.phoneNumber.split(' ').join('-')}`;
}

export default ViewModel;
