import { styled } from '@material-ui/core/styles';
import React from 'react';

import Logo from './Logo';

export default { title: 'Logo' };

export const byItself: React.FC = () => {
  return <Logo />;
};

const ColoredDiv = styled('div')(() => ({
  color: '#f00',
}));

export const inheritingCurrentColor: React.FC = () => {
  return (
    <ColoredDiv>
      <Logo />
    </ColoredDiv>
  );
};

export const overridingDefaultHref: React.FC = () => {
  return <Logo href="/some-other-link" />;
};
