import React from 'react';
import { withDesign } from 'storybook-addon-designs';

import Next from '../../../../modules/congrats/sections/Next';

const heading = 'what to expect next...';
const steps = [
  {
    number: '1',
    title: 'Finalize Your Purchase',
    description:
      'A Vroom representative will call to discuss terms and finalize your purchase.',
  },
  {
    number: '2',
    title: 'Make It Official',
    description: 'Vroom will overnight a contract for you to sign and return.',
  },
  {
    number: '3',
    title: 'Home Delivery',
    description: `Get your new ride delivered to your driveway anywhere within the continental U.S.`,
  },
];

export const Success = (): JSX.Element => {
  return <Next heading={heading} steps={steps} />;
};

Success.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/yhvMWzN95E1DdNLBfEr5OH/Desktop-Congrats?node-id=1%3A4',
  },
};

export default {
  title: 'Checkout/Congrats/Sections/Next',
  decorators: [withDesign],
};
