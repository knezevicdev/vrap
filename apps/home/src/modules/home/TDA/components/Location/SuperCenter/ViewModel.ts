class ViewModel {
  readonly title: string = 'Visit our Super Center today';
  readonly address: string =
    '12053 Southwest FWY (Highway 59) Stafford, Texas 77477';
  readonly locationInfo = {
    address: '12053 Southwest FWY (Highway 59) Stafford, Texas 77477',
    coords: {
      lat: 29.63898,
      lng: -95.5814,
    },
  };
  readonly contactInfo = {
    label: 'Contact us',
    line1: 'Main office - (281) 499-8200',
    line2: 'Main fax - (281) 783-2098',
  };
  readonly officeHours = {
    label: 'Office hours',
    line1: '10 AM to 6 PM Monday-Saturday',
    line2: 'Closed Sunday',
  };
  readonly paragraph1: string =
    "With over $4 Billion in Sales and over 100,000 customers satisfied since 2002, we are one of the Largest Independent Dealerships in the country. Customers travel from all over the World to buy from Texas Direct Auto. We carry ALL makes and models, and our financing is second to none. More than anything, our Job is to WOW our customers. WOW you with selection, financing, quality and service. If you are not WOW'd, then we have not done our jobs - not even close. Watch this short Video to learn more.";
  readonly paragraph2: string =
    'Looking for a car? Call, Click or Stop by our Stafford Campus located on over 70 Acres in Southwest Houston. Looking to Sell Us Your Car? We are conveniently located in most Suburban areas of Houston.';
}

export default ViewModel;
