import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class SuperCenterViewModel {
  readonly title = 'Visit Our Super Center Today!';
  readonly subtitle =
    'Looking to buy or sell a car? Call, Click or Stop by our Stafford Campus located on over 70 Acres in Southwest Houston.';

  supercenter = {
    src: `${publicRuntimeConfig.BASE_PATH}/modules/tda/images/tda_supercenter.jpg`,
    alt: 'Stafford - TDA Super Center',
  };

  locationDetails = {
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
  };
}

export default SuperCenterViewModel;
