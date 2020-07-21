import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import Desktop, { Links as InnerDesktopLinks } from './Desktop';
import Mobile, { Links as InnerMobileLinks } from './Mobile';

export type DesktopLinks = InnerDesktopLinks;
export type MobileLinks = InnerMobileLinks;

interface Props {
  desktopLinks: DesktopLinks;
  mobileAnchor?: 'bottom' | 'left' | 'right' | 'top';
  mobileLinks?: MobileLinks;
  mobileOpen?: boolean;
  onMobileOpen?: () => void;
  onMobileClose?: () => void;
}

const Nav: React.FC<Props> = ({
  desktopLinks,
  mobileAnchor,
  mobileLinks,
  mobileOpen,
  onMobileOpen,
  onMobileClose,
}) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  if (mdUp) {
    return <Desktop links={desktopLinks} />;
  }
  return (
    <Mobile
      anchor={mobileAnchor}
      links={mobileLinks}
      open={mobileOpen}
      onOpen={onMobileOpen}
      onClose={onMobileClose}
    />
  );
};

export default Nav;
