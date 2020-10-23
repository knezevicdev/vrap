import Drawer from '@material-ui/core/Drawer';
import { styled } from '@material-ui/core/styles';
import Menu from '@material-ui/icons/Menu';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import { ReactComponent as LogoSvg } from './svg/logo.svg';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ViewContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  zIndex: 1001,
  top: 0,
}));

const Bar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#041022',
  background: '#FFFFFF',
  height: '72px',
  padding: theme.spacing(2, 4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 2),
    height: '56px',
  },
  borderBottom: `1px solid ${theme.palette.grey[400]}`,
  boxShadow: `0 1px 4px 0 rgba(51, 51, 51, 0.1)`,
}));

const LogoAnchor = styled('a')(() => ({
  display: 'flex',
  marginRight: '16px',
}));

const Logo = styled(LogoSvg)(({ theme }) => ({
  height: '32px',
  [theme.breakpoints.down('sm')]: {
    height: '24px',
  },
}));

const NavDesktopView = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  [theme.breakpoints.down('sm')]: { display: 'none' },
  '& > *:not(:last-child)': {
    marginRight: '24px',
  },
}));

const NavLink = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  color: 'inherit',
  textDecoration: 'none',
  '&:visited': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '&:hover': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '&:active': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '&:after': {
    content: '""',
    display: 'flex',
    width: '0px',
    height: '2px',
    margin: 'auto',
    marginTop: '4px',
    background: theme.palette.primary.main,
    transition: 'width 250ms ease, background-color 250ms ease',
  },
  '&:hover:after': {
    width: '100%',
  },
}));

const NavMobileView = styled('div')(({ theme }) => ({
  display: 'none',
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: { display: 'flex' },
}));

const MobileNavLink = styled('a')(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  color: 'inherit',
  textDecoration: 'none',
  display: 'flex',
  '&:visited': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '&:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  '&:active': {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

const MenuIcon = styled(Menu)(() => ({
  marginLeft: 'auto',
  cursor: 'pointer',
}));

const StyledDrawer = styled(Drawer)(() => ({
  '& .MuiDrawer-paper': {
    minWidth: '280px',
  },
}));

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <Bar>
        <LogoAnchor
          href={viewModel.logoLink.href}
          onClick={viewModel.logoLink.handleAnalytics}
        >
          <Logo />
        </LogoAnchor>
        <NavDesktopView>
          {viewModel.navLinks.map((navLink) => (
            <NavLink
              key={navLink.label}
              href={navLink.href}
              onClick={navLink.handleAnalytics}
            >
              <Typography
                letterSpacing="1.25px"
                variant="button"
                fontWeight="fontWeightSemibold"
              >
                {navLink.label}
              </Typography>
            </NavLink>
          ))}
        </NavDesktopView>
        <NavMobileView>
          <MenuIcon onClick={viewModel.onDrawerClick} />
          <StyledDrawer
            anchor="right"
            open={viewModel.isDrawerOpen()}
            onClose={viewModel.onDrawerClick}
          >
            {viewModel.navLinks.map((navLink) => (
              <MobileNavLink key={navLink.label} href={navLink.href}>
                <Typography
                  letterSpacing="1.25px"
                  variant="button"
                  fontWeight="fontWeightSemibold"
                >
                  {navLink.label}
                </Typography>
              </MobileNavLink>
            ))}
          </StyledDrawer>
        </NavMobileView>
      </Bar>
    </ViewContainer>
  );
};

export default observer(View);
