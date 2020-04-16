export interface Option {
  text: string;
  href: string;
  target?: string;
}

class ContactOptionsViewModel {
  readonly title: string = 'Contact Us';
  readonly subtitle: string = "We're here to help";
  readonly options: Option[] = [
    {
      text: 'Call us at <link>1-800-338-5240</link>',
      href: 'tel:+1-800-338-5240',
    },
    {
      text: 'Email us at <link>Help@RocketAuto.com</link>',
      href: 'mailto:help@rocketauto.com',
    },
    {
      text: 'Find answers to common questions on <link>Vroom’s\xa0FAQ</link>',
      href: 'https://vroom.zendesk.com/hc/en-us',
      target: '_blank',
    },
  ];
}

export default ContactOptionsViewModel;
