import { Story } from '@storybook/react';
import { Meta } from '@storybook/react/types-6-0';
import React, { useState } from 'react';

import Input from '../Input';

export default {
  title: 'Design System/Elements/Input',
} as Meta;

const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(String(email).toLowerCase());
};

export const Email: Story = () => {
  const [value, setValue] = useState('');
  const [success, setSuccess] = useState(false);
  const error = !success ? undefined : 'Please enter a valid email';

  const onChange = (value: string): void => {
    setValue(value);
    setSuccess(!validateEmail(value));
  };

  return (
    <Input
      label="Email Example"
      placeholder="email"
      value={value}
      error={error}
      success={success}
      onChange={onChange}
    />
  );
};

/* eslint-disable @typescript-eslint/no-empty-function */
export const Default: Story = () => {
  const onChange = (): void => {};
  return <Input label="Field Label" value="" onChange={onChange} />;
};

export const Disabled: Story = () => {
  const onChange = (): void => {};
  return (
    <Input label="Field Label" value="Disabled" onChange={onChange} disabled />
  );
};

export const Success: Story = () => {
  const onChange = (): void => {};
  return (
    <Input label="Field Label" value="Success" success onChange={onChange} />
  );
};

export const Error: Story = () => {
  const onChange = (): void => {};
  return (
    <Input
      label="Field Label"
      error="error description"
      value="Error"
      onChange={onChange}
    />
  );
};
