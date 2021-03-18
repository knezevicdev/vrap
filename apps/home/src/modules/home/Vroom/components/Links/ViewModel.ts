/* eslint-disable @typescript-eslint/camelcase */
import getConfig from 'next/config';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

interface Link {
  label: string;
  href: string;
}

interface Vehicle {
  img_url: string;
  img_alt: string;
  link: Link;
  padding?: string;
  width?: string;
  flexGrow?: string;
}

interface Brand {
  image: {
    img_url: string;
    max_height?: number;
    max_width?: number;
  };
  name: string;
  href: string;
}

class HeroViewModel {
  private readonly analyticsHandler: AnalyticsHandler = new AnalyticsHandler();
  handleLinkClick = (label: string, href: string) => (): void => {
    this.analyticsHandler.trackLinkSectionLinkClicked(label, href);
  };

  readonly title_vehicle: string = 'shop by vehicle type';
  readonly title_brand: string = 'shop popular brands';
  readonly title_model: string = 'shop popular models';
  readonly vehicles: Vehicle[] = [
    {
      img_url: `${VROOM_URL}/static-assets/images/home-page/Truck-Body-Type.png`,

      img_alt: 'Truck - F-150',
      link: {
        label: 'Shop Trucks',
        href: `${VROOM_URL}/cars/types/truck`,
      },
      width: '100%',
      flexGrow: '37.6%',
    },
    {
      img_url: `${VROOM_URL}/static-assets/images/home-page/SUV-Body-Type.png`,

      img_alt: 'SUV - Lexus',
      link: {
        label: 'Shop SUVs',
        href: `${VROOM_URL}/cars/types/suv`,
      },
      width: '87%',
      flexGrow: '32.7%',
    },
    {
      img_url: `${VROOM_URL}/static-assets/images/home-page/Sedan-Body-Type.png`,

      img_alt: 'Sedan - Accord',
      link: {
        label: 'Shop Sedans',
        href: `${VROOM_URL}/cars/types/sedan`,
      },
      width: '79%',
      flexGrow: '29.7%',
    },
  ];
  readonly brands: Brand[] = [
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/tesla-logo.svg`,
        max_height: 72,
      },
      name: 'Tesla',
      href: `${VROOM_URL}/cars/tesla`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/jeep-logo.svg`,
        max_width: 94,
      },
      name: 'Jeep',
      href: `${VROOM_URL}/cars/jeep`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/land-rover-logo.svg`,
        max_width: 106,
      },
      name: 'Land Rover',
      href: `${VROOM_URL}/cars/land-rover`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/toyota-logo.svg`,
        max_width: 68,
      },
      name: 'Toyota',
      href: `${VROOM_URL}/cars/toyota`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/mercedes-benz-logo.svg`,
        max_width: 114,
      },
      name: 'Mercedes Benz',
      href: `${VROOM_URL}/cars/mercedes-benz`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/lexus-logo.svg`,
        max_width: 106,
      },
      name: 'Lexus',
      href: `${VROOM_URL}/cars/lexus`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/audi-logo.svg`,
        max_width: 104,
      },
      name: 'Audi',
      href: `${VROOM_URL}/cars/audi`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/bmw-logo.svg`,
        max_width: 72,
      },
      name: 'BMW',
      href: `${VROOM_URL}/cars/bmw`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/porsche-logo.svg`,
        max_width: 130,
      },
      name: 'Porsche',
      href: `${VROOM_URL}/cars/porsche`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/subaru-logo.svg`,
        max_width: 109,
      },
      name: 'Subaru',
      href: `${VROOM_URL}/cars/subaru`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/honda-logo.svg`,
        max_width: 101,
        max_height: 68,
      },
      name: 'Honda',
      href: `${VROOM_URL}/cars/honda`,
    },
    {
      image: {
        img_url: `${VROOM_URL}/static-assets/icons/home-page/companies/volvo-logo.svg`,
        max_width: 126,
      },
      name: 'Volvo',
      href: `${VROOM_URL}/cars/volvo`,
    },
  ];

  readonly models: Link[] = [
    {
      label: 'Acura MDX',
      href: `${VROOM_URL}/cars/acura/mdx`,
    },
    {
      label: 'Audi Q5',
      href: `${VROOM_URL}/cars/audi/q5`,
    },
    {
      label: 'BMW 4-Series',
      href: `${VROOM_URL}/cars/bmw/4-series`,
    },
    {
      label: 'Chevrolet Camaro',
      href: `${VROOM_URL}/cars/chevrolet/camaro`,
    },
    {
      label: 'Chevrolet Corvette',
      href: `${VROOM_URL}/cars/chevrolet/corvette`,
    },
    {
      label: 'Chevrolet Silverado 1500',
      href: `${VROOM_URL}/cars/chevrolet/silverado-1500`,
    },
    {
      label: 'Chevrolet Tahoe',
      href: `${VROOM_URL}/cars/chevrolet/tahoe`,
    },
    {
      label: 'Dodge Challenger',
      href: `${VROOM_URL}/cars/dodge/challenger`,
    },
    {
      label: 'Dodge Charger',
      href: `${VROOM_URL}/cars/dodge/charger`,
    },
    {
      label: 'Ford Explorer',
      href: `${VROOM_URL}/cars/ford/explorer`,
    },
    {
      label: 'Ford F-150',
      href: `${VROOM_URL}/cars/ford/f-150`,
    },
    {
      label: 'Ford F-250 Super-Duty',
      href: `${VROOM_URL}/cars/ford/f-250-super-duty`,
    },
    {
      label: 'Ford Mustang',
      href: `${VROOM_URL}/cars/ford/mustang`,
    },
    {
      label: 'Honda Accord',
      href: `${VROOM_URL}/cars/honda/accord`,
    },
    {
      label: 'Honda Civic',
      href: `${VROOM_URL}/cars/honda/civic`,
    },
    {
      label: 'Honda CR-V',
      href: `${VROOM_URL}/cars/honda/cr-v`,
    },
    {
      label: 'Honda Pilot',
      href: `${VROOM_URL}/cars/honda/pilot`,
    },
    {
      label: 'Infiniti Q50',
      href: `${VROOM_URL}/cars/infiniti/q50`,
    },
    {
      label: 'Jeep Grand-Cherokee',
      href: `${VROOM_URL}/cars/jeep/grand-cherokee`,
    },
    {
      label: 'Jeep Wrangler',
      href: `${VROOM_URL}/cars/jeep/wrangler`,
    },
    {
      label: 'Jeep Wrangler Unlimited',
      href: `${VROOM_URL}/cars/jeep/wrangler-unlimited`,
    },
    {
      label: 'Lexus RX-350',
      href: `${VROOM_URL}/cars/lexus/rx-350`,
    },
    {
      label: 'Mazda CX-5',
      href: `${VROOM_URL}/cars/mazda/cx-5`,
    },
    {
      label: 'Nissan Maxima',
      href: `${VROOM_URL}/cars/nissan/maxima`,
    },
    {
      label: 'Ram 1500',
      href: `${VROOM_URL}/cars/ram/ram-pickup-1500`,
    },
    {
      label: 'Subaru Forester',
      href: `${VROOM_URL}/cars/subaru/forester`,
    },
    {
      label: 'Subaru Outback',
      href: `${VROOM_URL}/cars/subaru/outback`,
    },
    {
      label: 'Tesla Model-3',
      href: `${VROOM_URL}/cars/tesla/model-3`,
    },
    {
      label: 'Tesla Model-s',
      href: `${VROOM_URL}/cars/tesla/model-s`,
    },
    {
      label: 'Tesla Model-X',
      href: `${VROOM_URL}/cars/tesla/model-x`,
    },
    {
      label: 'Toyota 4Runner',
      href: `${VROOM_URL}/cars/toyota/4runner`,
    },
    {
      label: 'Toyota Camry',
      href: `${VROOM_URL}/cars/toyota/camry`,
    },
    {
      label: 'Toyota Highlander',
      href: `${VROOM_URL}/cars/toyota/highlander`,
    },
    {
      label: 'Toyota RAV4',
      href: `${VROOM_URL}/cars/toyota/rav4`,
    },
    {
      label: 'Toyota Tacoma',
      href: `${VROOM_URL}/cars/toyota/tacoma`,
    },
    {
      label: 'Toyota Tundra',
      href: `${VROOM_URL}/cars/toyota/tundra`,
    },
  ];
}

export default HeroViewModel;
