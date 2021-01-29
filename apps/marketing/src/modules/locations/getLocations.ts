export interface LocationInfo {
  name: string;
  path: string;
  href: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: {
    office: string;
    fax: string;
  };
  businessHours: {
    days: string;
    hours: string;
  };
  googleMapsUrl: string;
  mapsImgUrl: string;
  closed: boolean;
}

export function getLocations(): LocationInfo[] {
  return [
    {
      name: 'Stafford',
      closed: false,
      path: 'stafford',
      href: '/marketing/locations/stafford',
      address: {
        street: '12053 Southwest Fwy',
        city: 'Stafford',
        state: 'TX',
        zipCode: '77477',
      },
      phone: {
        office: 'Office: (281) 499-8200',
        fax: 'Fax: (281) 783-2098',
      },
      businessHours: {
        days: 'Monday - Saturday',
        hours: '10 am - 6 pm',
      },
      googleMapsUrl: 'https://goo.gl/maps/KUwJwFhbxi2tF8NP8',

      mapsImgUrl:
        'https://assets.vroomcdn.com/static-rebrand/img/tda/location/stafford.jpg',
    },
    {
      name: 'Clear\xa0Lake (League\xa0City)',
      closed: false,
      path: 'clear-lake',
      href: '/marketing/locations/clear-lake',
      address: {
        street: '300 Gulf Fwy N',
        city: 'League City',
        state: 'TX',
        zipCode: '77573',
      },
      phone: {
        office: 'Office: (281) 895-2754',
        fax: 'Fax: (281) 854-2543',
      },
      businessHours: {
        days: 'Monday - Saturday',
        hours: '9 am - 6 pm',
      },
      googleMapsUrl: 'https://goo.gl/maps/y8rvyunyoPWBqkMn7',
      mapsImgUrl:
        'https://assets.vroomcdn.com/static-rebrand/img/tda/location/clear_lake.jpg',
    },
    {
      name: 'The Woodlands',
      closed: true,
      path: 'woodlands',
      href: '/marketing/locations/woodlands',
      address: {
        street: '26119 I-45 N',
        city: 'Spring',
        state: 'TX',
        zipCode: '77380',
      },
      phone: {
        office: 'Office: (281) 895-3464',
        fax: 'Fax: (832) 310-2167',
      },
      businessHours: {
        days: 'Monday - Saturday',
        hours: '9 am - 6 pm',
      },
      googleMapsUrl: 'https://goo.gl/maps/uCkWMp49FBMrjZSFA',

      mapsImgUrl:
        'https://assets.vroomcdn.com/static-rebrand/img/tda/location/woodland.jpg',
    },
    {
      name: 'Memorial',
      closed: false,
      path: 'memorial',
      href: '/marketing/locations/memorial',
      address: {
        street: '12171 Katy Fwy',
        city: 'Houston',
        state: 'TX',
        zipCode: '77079',
      },
      phone: {
        office: 'Office: (281) 895-1872',
        fax: 'Fax: (832) 463-1192',
      },
      businessHours: {
        days: 'Monday - Saturday',
        hours: '9 am - 6 pm',
      },
      googleMapsUrl: 'https://goo.gl/maps/Yek1r2zTcJvnZtJZ9',

      mapsImgUrl:
        'https://assets.vroomcdn.com/static-rebrand/img/tda/location/memorial.jpg',
    },
    {
      name: 'Katy',
      closed: false,
      path: 'katy',
      href: '/marketing/locations/katy',
      address: {
        street: '22461 Katy Freeway',
        city: 'Katy',
        state: 'TX',
        zipCode: '77450',
      },
      phone: {
        office: 'Office: (281) 872-6648',
        fax: 'Fax: (281) 476-7493',
      },
      businessHours: {
        days: 'Monday - Saturday',
        hours: '9 am - 6 pm',
      },
      googleMapsUrl: 'https://goo.gl/maps/VeRiY68MWa24Qx5n7',
      mapsImgUrl:
        'https://assets.vroomcdn.com/static-rebrand/img/tda/location/katy.jpg',
    },
    {
      name: 'Cypress',
      closed: false,
      path: 'cypress',
      href: '/marketing/locations/cypress',
      address: {
        street: '19710 Northwest Freeway #400',
        city: 'Houston',
        state: 'TX',
        zipCode: '77065',
      },
      phone: {
        office: 'Office: (281) 895-1447',
        fax: 'Fax: (281) 854-2547',
      },
      businessHours: {
        days: 'Monday - Saturday',
        hours: '9 am - 6 pm',
      },
      googleMapsUrl: 'https://goo.gl/maps/rVHXyavJk4v2Qi5v7',

      mapsImgUrl:
        'https://assets.vroomcdn.com/static-rebrand/img/tda/location/cypress.jpg',
    },
    {
      name: 'Kingwood',
      closed: true,
      path: 'kingwood',
      href: '/marketing/locations/kingwood',
      address: {
        street: '23906 Eastex Fwy',
        city: 'Kingwood',
        state: 'TX',
        zipCode: '77339',
      },
      phone: {
        office: 'Office: (281) 895-3466',
        fax: 'Fax: (281) 605-5764',
      },
      businessHours: {
        days: 'Monday - Saturday',
        hours: '9 am - 6 pm',
      },
      googleMapsUrl: 'https://goo.gl/maps/SBhBhUNdCBkCZH9Y7',
      mapsImgUrl:
        'https://assets.vroomcdn.com/static-rebrand/img/tda/location/kingwood.jpg',
    },
    {
      name: 'Galleria (Westheimer)',
      closed: false,
      path: 'galleria',
      href: '/marketing/locations/galleria',
      address: {
        street: '7730 Westheimer Rd',
        city: 'Houston',
        state: 'TX',
        zipCode: '77063',
      },
      phone: {
        office: 'Office: (281) 895-2405',
        fax: 'Fax: (832) 460-3128',
      },
      businessHours: {
        days: 'Monday - Saturday',
        hours: '9 am - 6 pm',
      },
      googleMapsUrl: 'https://goo.gl/maps/QNpUtKDbv1yy6qLL9',

      mapsImgUrl:
        'https://assets.vroomcdn.com/static-rebrand/img/tda/location/galleria.jpg',
    },
  ];
}
