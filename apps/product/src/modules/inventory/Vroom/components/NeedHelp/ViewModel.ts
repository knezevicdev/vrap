interface FAQ {
  title: string;
  href: string;
  hrefText: string;
  body: string;
}

interface Call {
  title: string;
  body: string;
}

class NeedHelpViewModel {
  readonly title: string = 'need help?';
  readonly subtitle: string = "We're always here to help";

  readonly faq: FAQ = {
    title: 'Check Our FAQ',
    href: 'https://vroom.zendesk.com/hc/en-us',
    hrefText: 'Click here',
    body: ' to view our Frequently Asked Questions',
  };

  readonly call: Call = {
    title: 'Call Us',
    body:
      'Call us at (855) 524-1300 anytime 9AM-5PM (Eastern Time), Monday through Friday',
  };

  readonly callTitle: string = 'Call Us';
  readonly callBody: string =
    'Call us at (855) 524-1300 anytime 9AM-5PM (Eastern Time), Monday through Friday';
}

export default NeedHelpViewModel;
