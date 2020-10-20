interface FAQ {
  title: string;
  href: string;
  hrefText: string;
  body: string;
}

interface Time {
  day: string;
  hours: string;
}

interface Call {
  title: string;
  phone: string;
  times: Time[];
  timezone: string;
}

class NeedHelpViewModel {
  readonly title: string = 'Need Help?';
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
    phone: '(855) 524-1300',
    times: [
      {
        day: 'Mon - Fri: ',
        hours: '9am - 10pm',
      },
      {
        day: 'Sat: ',
        hours: '9am - 8pm',
      },
      {
        day: 'Sun: ',
        hours: '11am - 8pm',
      },
    ],
    timezone: '(Eastern Standard Time)',
  };
}

export default NeedHelpViewModel;
