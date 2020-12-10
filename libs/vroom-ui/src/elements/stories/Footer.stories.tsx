import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import Footer from '../Navigation/Footer/Footer';

export default {
  title: 'Design System/Elements/Navigation/Footer',
} as Meta;

export const Default: Story = () => {
  return <Footer />;
};

Default.parameters = {
  design: {
    type: 'figma',
    url:
      'https://www.figma.com/file/YuFZHgGp9QMb5yof3UmKYY/Vroom-Design-Library-2.0?node-id=114%3A0',
  },
};
