import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class LocationsViewModel {
  readonly title = 'Houston Sell Us Your Car Centers';
  readonly subTitle =
    'Visit any of our 10 conveniently located Sell Us Your Car Centers listed here. Once you accept the offer at our store, you can leave with payment in hand.';

  locations = new Array(8).fill({
    name: 'Stafford - TDA Super Center',
    addressLine1: '12053 Southwest Fwy',
    addressLine2: 'Stafford, TX 77477',
    map: {
      text: 'Map This Location',
      link: 'https://goo.gl/maps/KUwJwFhbxi2tF8NP8',
    },
    phone: {
      title: 'Phone',
      office: 'Main Office: (281) 499-8200',
      fax: 'Main Fax: (281) 783-2098',
    },
    hoursOfOperation: {
      title: 'Hours of Operation',
      days: 'Monday - Saturday',
      time: '10 am - 6 pm',
    },
  });
}

export default LocationsViewModel;
