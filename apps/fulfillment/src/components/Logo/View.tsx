/* eslint-disable @typescript-eslint/camelcase */
import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

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

interface Props {
  viewModel: ViewModel;
}

const Logo: React.FC<Props> = ({ viewModel }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    viewModel.handleLogoClick(event);
  };

  return (
    <StyledAnchor
      className={viewModel.className}
      href={viewModel.href}
      onClick={handleClick}
    >
      <StyledLogoSvg />
      <Typography variant="srOnly">Home</Typography>
    </StyledAnchor>
  );
};

export default Logo;
