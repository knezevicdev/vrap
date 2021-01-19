import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class ValuesViewModel {
  readonly title = `Vroom Values`;
  readonly subtitle = `We believe buying a car should be fun, easy and affordable. Here's how Vroom is leading the revolution.`;
  readonly bgImage = `${publicRuntimeConfig.BASE_PATH}/modules/vroom/images/reviews/values-background.jpg`;
  readonly beforeTagline = 'Before';
  readonly afterTagline = 'After';
  readonly tabs = [
    {
      key: 0,
      title: 'Price',
      beforeTitle: 'Haggling Was Mandatory',
      beforeDesc:
        'At the dealership, you had to negotiate to get a fair price. This added time and stress to the buying process.',
      afterTitle: 'Cars Priced as Low as Possible',
      afterDesc:
        "We've eliminated the middleman and made the entire car buying process more efficient, which allows us to pass the savings onto our customers.",
    },
    {
      key: 1,
      title: 'Reconditioning',
      beforeTitle: 'Issues Under The Hood',
      beforeDesc:
        'You bought the perfect car, only to have it break down the same week you took it off the lot. The seller was of little help and you were stuck with a fixer-upper.',
      afterTitle: 'Multiple Inspections',
      afterDesc:
        'Every car we sell has a clean title and an accident-free CARFAX® vehicle history report. Cars are inspected for safety, mechanical, and cosmetic issues.',
    },
    {
      key: 2,
      title: '7-day returns',
      beforeTitle: 'Returning a car? Not gonna happen.',
      beforeDesc:
        "Decide if you like the car during a 20-minute test drive with a salesperson. Once you drive off the lot, there's no going back.",
      afterTitle: '7 Days to Decide',
      afterDesc:
        "Spend a week (or 250 miles) getting to know your Vroom. Take a trip, park it in your garage, drive it to work. If it's not right, we'll take it back.",
    },
    {
      key: 3,
      title: 'Finance',
      beforeTitle: 'You Accepted Poor Financing',
      beforeDesc:
        "Maybe you got the car price you wanted, but got crushed on your loan. There's no reason your dealer should profit from a high interest rate.",
      afterTitle: 'Get a Competitive Rate',
      afterDesc:
        'Vroom works with more than 12 financing partners, so you can get a great rate.',
    },
    {
      key: 4,
      title: 'Coverage',
      beforeTitle: 'Only New Cars Came Protected',
      beforeDesc:
        "Every car should be sold with coverage, but your dealer or private seller didn't/couldn't offer a warranty. That left you and your car at risk.",
      afterTitle: 'Free Limited Warranty',
      afterDesc:
        "A limited warranty is included with most Vroom vehicles, good for 90 days or 6,000 miles. The majority of our cars are still under their manufacturer's warranty.",
    },
  ];
}

export default ValuesViewModel;
