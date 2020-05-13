class ValuesViewModel {
  readonly title: string = 'vroom values';
  readonly subtitle: string =
    'We believe buying a car should be fun, easy, and affordable.  Here’s how Vroom is leading\xa0the\xa0revolution.';
  readonly values = [
    {
      type: 'PRICE',
      title: 'No haggling. No pressure.',
      description:
        'We’ve eliminated the middleman and made the entire car buying process more efficient, which allows us to pass the savings on to our customers.',
    },
    {
      type: 'RECONDITINOING',
      title: 'Multiple Inspections',
      description:
        'Our cars are inspected for safety, mechanical and cosmetic issues. We only sell cars that have accident-free CARFAX vehicle history reports at the time of purchase and sale.',
    },
    {
      type: 'FINANCE',
      title: 'Get a Competitive Rate',
      description:
        'Vroom has strategic relationships with partners like Chase, Santander, and Ally to secure the best financing for you.',
    },
    {
      type: 'DELIVER TO YOU',
      title: 'Delivery Straight to You',
      description:
        'Delivering cars is at the heart of what we do. Save a trip to the dealership and let us bring your next car to you.',
    },
    {
      type: '7-DAY RETURNS',
      title: '7 Days to Decide',
      description:
        'Spend a week (or 250 miles) getting to know your vehicle. Take a trip, park it in your garage, drive it to work. If it’s not right, we’ll take it back.',
    },
    {
      type: 'COVERAGE',
      title: 'Free Limited Warranty',
      description:
        'A limited warranty is included with most Vroom vehicles, good for 90 days or 6,000 miles. The majority of our cars are still under their manufacturer’s warranty.',
    },
  ];
}

export default ValuesViewModel;