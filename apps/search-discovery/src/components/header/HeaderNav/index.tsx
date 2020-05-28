import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import DesktopView from './DesktopView';
import MobileView from './MobileView';
import HeaderNavViewModel from './ViewModel';

const HeaderNav: React.FC = () => {
  const viewModel = new HeaderNavViewModel();
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  if (mdUp) {
    return <DesktopView viewModel={viewModel} />;
  }
  return <MobileView viewModel={viewModel} />;
};

export default HeaderNav;
