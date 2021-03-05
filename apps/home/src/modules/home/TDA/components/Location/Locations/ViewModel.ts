import { Coords } from 'google-map-react';

export interface LocationInfo {
  locationInfo: {
    address: string;
    coords: Coords;
  };
  hours: string;
  phone: {
    office: string;
    fax: string;
  };
  title: string;
  urlPath: string;
  googleMapsUrl: string;
  closed: boolean;
}

class ViewModel {
  readonly title: string = 'Houston Sell Us Your Car® Centers';
  readonly locations: LocationInfo[] = [
    {
      locationInfo: {
        address: '12053 Southwest Fwy, Stafford, TX 77477',
        coords: {
          lat: 29.64565,
          lng: -95.57154,
        },
      },
      hours: '10 am - 7 pm',
      phone: {
        office: '(281) 499-8200',
        fax: '(281) 783-2098',
      },
      urlPath: 'locations/stafford',
      title: 'Stafford',
      googleMapsUrl: 'https://goo.gl/maps/KUwJwFhbxi2tF8NP8',
      closed: false,
    },
    {
      locationInfo: {
        address: '300 Gulf Fwy N, League City, TX 77573',
        coords: {
          lat: 29.50505,
          lng: -95.11477,
        },
      },
      hours: '10 am - 7 pm',
      phone: {
        office: '(281) 895-2754',
        fax: '(281) 854-2543',
      },
      urlPath: 'locations/clear-lake',
      title: 'Clear Lake (League City)',
      googleMapsUrl: 'https://goo.gl/maps/y8rvyunyoPWBqkMn7',
      closed: false,
    },
    {
      locationInfo: {
        address: '26119 I-45 N, Spring, TX 77380',
        coords: {
          lat: 30.03781,
          lng: -95.42916,
        },
      },
      hours: '10 am - 7 pm',
      phone: {
        office: '(281) 895-3464',
        fax: '(832) 310-2167',
      },
      urlPath: 'locations/woodlands',
      title: 'The Woodlands',
      googleMapsUrl: 'https://goo.gl/maps/uCkWMp49FBMrjZSFA',
      closed: false,
    },
    {
      locationInfo: {
        address: '12171 Katy Fwy, Houston, TX 77079',
        coords: {
          lat: 29.78334,
          lng: -95.60163,
        },
      },
      hours: '10 am - 7 pm',
      phone: {
        office: '(281) 895-1872',
        fax: '(832) 463-1192',
      },
      urlPath: 'locations/memorial',
      title: 'Memorial',
      googleMapsUrl: 'https://goo.gl/maps/Yek1r2zTcJvnZtJZ9',
      closed: false,
    },
    {
      locationInfo: {
        address: '22461 Katy Freeway, Katy, TX 77450',
        coords: {
          lat: 29.78459,
          lng: -95.76281,
        },
      },
      hours: '10 am - 7 pm',
      phone: {
        office: '(281) 872-6648',
        fax: '(281) 476-7493',
      },
      urlPath: 'locations/katy',
      title: 'Katy',
      googleMapsUrl: 'https://goo.gl/maps/VeRiY68MWa24Qx5n7',
      closed: false,
    },
    {
      locationInfo: {
        address: '19710 Northwest Freeway #400, Houston, TX 77065',
        coords: {
          lat: 29.91542,
          lng: -95.61384,
        },
      },
      hours: '10 am - 7 pm',
      phone: {
        office: '(281) 895-1447',
        fax: '(281) 854-2547',
      },
      urlPath: 'locations/cypress',
      title: 'Cypress',
      googleMapsUrl: 'https://goo.gl/maps/rVHXyavJk4v2Qi5v7',
      closed: false,
    },
    {
      locationInfo: {
        address: '23906 Eastex Fwy, Kingwood, TX 77339',
        coords: {
          lat: 30.06367,
          lng: -95.24828,
        },
      },
      hours: '10 am - 7 pm',
      phone: {
        office: '(281) 895-3466',
        fax: '(281) 605-5764',
      },
      urlPath: 'locations/kingwood',
      title: 'Kingwood',
      googleMapsUrl: 'https://goo.gl/maps/SBhBhUNdCBkCZH9Y7',
      closed: false,
    },
    {
      locationInfo: {
        address: '7730 Westheimer Rd, Houston, TX 77063',
        coords: {
          lat: 29.7379,
          lng: -95.50478,
        },
      },
      hours: '10 am - 7 pm',
      phone: {
        office: '(281) 895-2405',
        fax: '(832) 460-3128',
      },
      urlPath: 'locations/galleria',
      title: 'Galleria (Westheimer)',
      googleMapsUrl: 'https://goo.gl/maps/QNpUtKDbv1yy6qLL9',
      closed: false,
    },
  ];
}

export default ViewModel;
