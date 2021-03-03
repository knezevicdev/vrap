import { Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Link from 'next/link';
import React from 'react';

import { ReactComponent as LogoSvg } from 'src/svg/logo.svg';

const StyledAnchor = styled('a')(() => ({
  color: 'inherit',
  display: 'inline-flex',
}));

const StyledLogoSvg = styled(LogoSvg)(({ theme }) => ({
  width: '104px',
  height: '17px',
  [theme.breakpoints.up('md')]: {
    width: '116px',
    height: '20px',
  },
}));

const Logo = (): JSX.Element => (
  <Link href="/" passHref>
    <StyledAnchor>
      <StyledLogoSvg />
      <Typography variant="srOnly">Home</Typography>
    </StyledAnchor>
  </Link>
);

export default Logo;
