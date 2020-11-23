import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import { Button } from '../Button';

export default {
  title: 'Design System/Elements/Button',
} as Meta;

const onClick = (): void => {
  alert('clicked');
};

export const Primary: Story = () => {
  return <Button.Primary onClick={onClick}>Primary</Button.Primary>;
};

export const PrimaryDisabled: Story = () => {
  return (
    <Button.Primary disabled onClick={onClick}>
      Primary Disabled
    </Button.Primary>
  );
};

export const Secondary: Story = () => {
  return <Button.Secondary onClick={onClick}>Secondary</Button.Secondary>;
};

export const SecondaryDisabled: Story = () => {
  return (
    <Button.Secondary disabled onClick={onClick}>
      Secondary Disabled
    </Button.Secondary>
  );
};

export const Outline: Story = () => {
  return <Button.Outline onClick={onClick}>Outline</Button.Outline>;
};
export const OutlineDisabled: Story = () => {
  return (
    <Button.Outline disabled onClick={onClick}>
      Outline Disabled
    </Button.Outline>
  );
};

export const Bare: Story = () => {
  return <Button.Bare onClick={onClick}>Bare</Button.Bare>;
};
export const BareDisabled: Story = () => {
  return (
    <Button.Bare disabled onClick={onClick}>
      Bare Disabled
    </Button.Bare>
  );
};
