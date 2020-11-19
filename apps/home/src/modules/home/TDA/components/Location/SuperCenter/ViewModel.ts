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
  readonly paragraphs: string[] = [
    'Texas Direct Auto is one of the largest independent auto dealerships in the country, with thousands of cars available for purchase. Vroom, a national online dealership, helps make it happen.',
    'Browse through our extensive inventory of the most popular makes and models to find the one that’s right for you. We offer competitive rates and easy online financing. Every Texas Direct Auto vehicle is thoroughly inspected by our talented team of mechanics for safety, mechanical, and cosmetic issues. We only sell vehicles with clean titles, and with no history of accidents, as reported to CarFax at the time of sale. ',
    'Looking to buy? Stop by our Stafford store, located on over 70 acres in Southwest Houston. Looking to Sell Us Your Car®, visit us at one of our conveniently located Centers across Houston.',
  ];
}

export default ViewModel;
