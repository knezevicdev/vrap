import React from 'react';

import Button from './Button';

export default { title: 'Button' };

export const withText: React.FC = () => {
  return <Button>Oh hey there</Button>;
};
