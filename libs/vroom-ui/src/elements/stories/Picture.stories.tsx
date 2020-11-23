import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Picture as PictureComponent } from '../Picture';

export default {
  title: 'Design System/Elements/Picture',
} as Meta;

export const Picture: Story = () => {
  return (
    <PictureComponent
      alt="Vroom Logo"
      src="/assets/logo.png"
      width="auto"
      aspectRatio="16:9"
    />
  );
};
