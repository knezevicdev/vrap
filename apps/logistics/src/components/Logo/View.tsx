import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
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

export interface Props {
  className: string;
  href: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const Logo: React.FC<Props> = ({ className, href, onClick }) => (
  <StyledAnchor className={className} href={href} onClick={onClick}>
    <StyledLogoSvg />
    <Typography variant="srOnly">Home</Typography>
  </StyledAnchor>
);

export default Logo;
