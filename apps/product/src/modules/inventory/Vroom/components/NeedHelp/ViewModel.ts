interface FAQ {
  title: string;
  href: string;
  hrefText: string;
  body: string;
}

interface Call {
  title: string;
  body1: string;
  body2: string;
}

class NeedHelpViewModel {
  readonly title: string = 'need help?';
  readonly subtitle: string =
    'We’re here to make sure you get the answers you need, wether you’re ready to buy, or just starting to browse.';

  readonly faq: FAQ = {
    title: 'Check Our FAQ',
    href: 'https://vroom.zendesk.com/hc/en-us',
    hrefText: 'Visit our Frequently Asked Questions page',
    body: ' to learn about Vroom, purchasing or selling a vehicle, and more.',
  };

  readonly call: Call = {
    title: 'Call Us',
    body1: 'Call us at (855) 524-1300',
    body2: '9AM-5PM (Eastern Time), Monday through Friday',
  };
}

export default NeedHelpViewModel;
