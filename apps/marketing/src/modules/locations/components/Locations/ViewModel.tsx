class LocationsViewModel {
  readonly title = 'Houston Sell Us Your Car Centers';
  readonly subTitle =
    'Visit any of our 10 conveniently located Sell Us Your Car Centers listed here. Once you accept the offer at our store, you can leave with payment in hand.';
  readonly mapText = 'Map This Location';
  locations = [
    {
      name: 'Stafford',
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
      businessHours: 'Hours: Mon - Sat, 10 am - 6 pm',
      googleMapsUrl: 'https://goo.gl/maps/KUwJwFhbxi2tF8NP8',
      salesforceAPIMapping: 'Texas Direct Auto',
    },
    {
      name: 'Clear\xa0Lake (League\xa0City)',
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
      businessHours: 'Hours: Mon - Sat, 9 am - 6 pm',
      googleMapsUrl: 'https://goo.gl/maps/y8rvyunyoPWBqkMn7',
      salesforceAPIMapping: 'suyc_clear_lake',
    },
    {
      name: 'The Woodlands',
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
      businessHours: 'Hours: Mon - Sat, 9 am - 6 pm',
      googleMapsUrl: 'https://goo.gl/maps/uCkWMp49FBMrjZSFA',
      salesforceAPIMapping: 'suyc_the_woodlands',
    },
    {
      name: 'Memorial',
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
      businessHours: 'Hours: Mon - Sat, 9 am - 6 pm',
      googleMapsUrl: 'https://goo.gl/maps/Yek1r2zTcJvnZtJZ9',
      salesforceAPIMapping: 'suyc_memorial',
    },
    {
      name: 'Katy',
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
      businessHours: 'Hours: Mon - Sat, 9 am - 6 pm',
      googleMapsUrl: 'https://goo.gl/maps/VeRiY68MWa24Qx5n7',
      salesforceAPIMapping: 'suyc_katy',
    },
    {
      name: 'Cypress',
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
      businessHours: 'Hours: Mon - Sat, 9 am - 6 pm',
      googleMapsUrl: 'https://goo.gl/maps/rVHXyavJk4v2Qi5v7',
      salesforceAPIMapping: 'suyc_cypress',
    },
    {
      name: 'Kingwood',
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
      businessHours: 'Hours: Mon - Sat, 9 am - 6 pm',
      googleMapsUrl: 'https://goo.gl/maps/SBhBhUNdCBkCZH9Y7',
      salesforceAPIMapping: 'suyc_kingwood',
    },
    {
      name: 'Galleria (Westheimer)',
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
      businessHours: 'Hours: Mon - Sat, 9 am - 6 pm',
      googleMapsUrl: 'https://goo.gl/maps/QNpUtKDbv1yy6qLL9',
      salesforceAPIMapping: 'suyc_westheimer',
    },
  ];
}

export default LocationsViewModel;
