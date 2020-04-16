import React from 'react';

import { ReactComponent as BrowseIcon } from './svg/browse.svg';
import { ReactComponent as GetItDeliveredIcon } from './svg/get-it-delivered.svg';
import { ReactComponent as MakeItYoursIcon } from './svg/make-it-yours.svg';

interface Step {
  description: string;
  title: string;
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  iconViewBox: string;
}

class HowItWorksViewModel {
  linkLabel = (): string => 'Learn More';
  steps = (): Step[] => {
    return [
      {
        title: 'Browse Online',
        description:
          'Explore thousands of vehicles with new inventory\xa0every\xa0week.',
        IconComponent: BrowseIcon,
        iconViewBox: '0 0 74 62',
      },
      {
        title: 'Make It Yours',
        description: 'Find the one, customize your deal\xa0and\xa0sign.',
        IconComponent: MakeItYoursIcon,
        iconViewBox: '0 0 74 80',
      },
      {
        title: 'Get It Delivered',
        description:
          'Delivery straight to you, make sure the car is right for you\xa0and\xa0enjoy.',
        IconComponent: GetItDeliveredIcon,
        iconViewBox: '0 0 75 65',
      },
    ];
  };
  title = (): string => 'How It Works';
}

export default HowItWorksViewModel;
