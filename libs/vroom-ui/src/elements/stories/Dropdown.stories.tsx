import { Story } from '@storybook/react';
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import styled from 'styled-components';

import Dropdown from '../Dropdown';

export default {
  title: 'Design System/Elements/Dropdown',
} as Meta;

const options = [
  { value: 'AL', label: 'Alabama' },
  { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' },
  { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' },
  { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' },
  { value: 'DE', label: 'Delaware' },
  { value: 'DC', label: 'District Of Columbia' },
  { value: 'FL', label: 'Florida' },
  { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' },
  { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' },
  { value: 'IA', label: 'Iowa' },
  { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' },
  { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' },
  { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' },
  { value: 'MI', label: 'Michigan' },
];

/* eslint-disable @typescript-eslint/no-empty-function */
const onSelectCallback = (): void => {};

export const SelectState: Story = () => {
  return (
    <State
      label="State"
      placeholder="State"
      options={options}
      onSelectCallback={onSelectCallback}
    />
  );
};

export const Disabled: Story = () => {
  return (
    <Dropdown
      disabled
      label="Drop Down Disabled"
      options={options}
      onSelectCallback={onSelectCallback}
    />
  );
};

export const Error: Story = () => {
  return (
    <Dropdown
      label="Drop Down Label"
      options={options}
      onSelectCallback={onSelectCallback}
      error="error description"
    />
  );
};

const State = styled(Dropdown)`
  width: 196px;
`;
