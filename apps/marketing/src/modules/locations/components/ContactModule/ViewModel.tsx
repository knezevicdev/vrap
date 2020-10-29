import getConfig from 'next/config';
const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

class ContactViewModel {
  readonly title = 'Questions?';
  links = [
    {
      icon: `${BASE_PATH}/modules/tda/icons/faq.svg`,
      text: 'Visit Our Help Center',
      link: 'https://vroom.zendesk.com/hc/en-us',
    },
    {
      icon: `${BASE_PATH}/modules/tda/icons/email.svg`,
      text: 'Send a Message',
      link: '/contact',
    },
    {
      icon: `${BASE_PATH}/modules/tda/icons/phone.svg`,
      text: `(855) 524-1300`,
      link: `tel:1-(855) 524-1300}`,
    },
  ];
}

export default ContactViewModel;
