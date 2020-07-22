import Drawer from '@material-ui/core/Drawer';
import { styled } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/icons/Menu';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import { ReactComponent as LogoSvg } from './svg/logo.svg';
import { ReactComponent as ShopSvg } from './svg/shop.svg';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ViewContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  zIndex: 1001,
  top: 0
}));

const Top = styled('div')(({ theme }) => ({
  display: 'flex',
  color: '#FFFFFF',
  background: '#CC0000',
  maxHeight: '48px',
  minHeight: '48px',
  padding: theme.spacing(1, 2),
  [theme.breakpoints.only('xs')]: { padding: theme.spacing(1, 2) },
}));

const Bottom = styled('div')(({ theme }) => ({
  display: 'flex',
  color: '#767676',
  background: '#FFFFFF',
  maxHeight: '48px',
  minHeight: '48px',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  [theme.breakpoints.only('xs')]: { padding: theme.spacing(1, 2) },
  borderBottom: 'solid 1px #F1F1F1',
}));

const Logo = styled(LogoSvg)(() => ({
  maxWidth: '295px',
  minWidth: '295px',
}));

const DesktopView = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.only('xs')]: { display: 'none' },
}));

const MobileView = styled('div')(({ theme }) => ({
  display: 'none',
  width: '100%',
  alignItems: 'center',
  [theme.breakpoints.only('xs')]: { display: 'flex' },
}));

const ShopNowContainer = styled('a')(() => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  marginLeft: 'auto',
}));

const ShopLabel = styled(Typography)(({ theme }) => ({
  color: '#FFFFFF',
  fontSize: '18px',
  [theme.breakpoints.only('xs')]: {
    color: '#767676',
    fontSize: '14px',
    fontWeight: 600,
  },
}));

const ShopIcon = styled(ShopSvg)(({ theme }) => ({
  width: '20px',
  marginRight: theme.spacing(1),
  fill: '#FFFFFF',
  [theme.breakpoints.only('xs')]: { fill: '#767676' },
}));

const Link = styled('a')(({ theme }) => ({
  display: 'flex',
  textDecoration: 'none',
  '& >p': {
    fontSize: '16px',
  },
  color: '#767676',
  marginRight: theme.spacing(4),
}));

const MenuLink = styled('a')(({ theme }) => ({
  display: 'flex',
  textDecoration: 'none',
  '& >p': {
    fontSize: '18px',
  },
  color: '#767676',
  padding: theme.spacing(2),
  borderBottom: 'solid 1px #D8D8D8',
}));

const DropdownLink = styled(Link)(({ theme }) => ({
  '& >p': {
    lineHeight: '20px',
    fontSize: '14px',
  },
  marginRight: theme.spacing(0),
  marginBottom: theme.spacing(1),
}));

const DropdownLabelContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#767676',
  '& >p': { fontSize: '16px' },
  marginRight: theme.spacing(4),
  [theme.breakpoints.only('xs')]: { display: 'none' },
  cursor: 'pointer',
  position: 'relative',
}));

const Dropdown = styled('div')(({ theme }) => ({
  position: 'absolute',
  background: '#FFFFFF',
  top: '37px',
  left: '-16px',
  right: '-16px',
  padding: theme.spacing(2),
  boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.15)',
  '& >a:last-child': { marginBottom: 0 },
  '& >a': { pointerEvents: 'all' },
  pointerEvents: 'none',
}));

const ExpandLessIcon = styled(ExpandLess)(() => ({
  marginTop: '4px',
  height: '22px',
}));

const ExpandMoreIcon = styled(ExpandMore)(() => ({
  marginTop: '4px',
  height: '22px',
}));

const MenuIcon = styled(Menu)(() => ({
  marginLeft: 'auto',
  cursor: 'pointer',
}));

const LearningCenter = styled('div')(({ theme }) => ({
  borderBottom: 'solid 1px #D8D8D8',
  padding: theme.spacing(2),
}));

const LearningLabel = styled(Typography)(({ theme }) => ({
  color: '#767676',
  fontSize: '18px',
  fontWeight: 600,
  paddingBottom: theme.spacing(1),
}));

const LearningLinks = styled('a')(({ theme }) => ({
  display: 'flex',
  textDecoration: 'none',
  '& >p': {
    fontSize: '18px',
  },
  color: '#767676',
  padding: theme.spacing(1),
}));

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <Top>
        <Logo />
        <DesktopView>
          <ShopNowContainer href={viewModel.shopNow.href}>
            <ShopIcon />
            <ShopLabel>{viewModel.shopNow.label}</ShopLabel>
          </ShopNowContainer>
        </DesktopView>
        <MobileView>
          <MenuIcon onClick={viewModel.onDrawerClick} />
          <Drawer
            anchor="right"
            open={viewModel.isDrawerOpen()}
            onClose={viewModel.onDrawerClick}
          >
            <MenuLink
              href={viewModel.financeCalculators.href}
              target={viewModel.financeCalculators.target}
            >
              <Typography>{viewModel.financeCalculators.label}</Typography>
            </MenuLink>
            <LearningCenter>
              <LearningLabel>{viewModel.learningCenterLabel}</LearningLabel>
              {viewModel.learningCenterLinks.map((link) => {
                return (
                  <LearningLinks
                    key={link.href}
                    href={link.href}
                    target={link.target}
                  >
                    <Typography>{link.label}</Typography>
                  </LearningLinks>
                );
              })}
            </LearningCenter>
            <MenuLink href={viewModel.contactUs.href}>
              <Typography>{viewModel.contactUs.label}</Typography>
            </MenuLink>
            <MenuLink
              href={viewModel.backToCorporate.href}
              target={viewModel.backToCorporate.target}
            >
              <Typography>{viewModel.backToCorporate.label}</Typography>
            </MenuLink>
          </Drawer>
        </MobileView>
      </Top>
      <Bottom>
        <DesktopView>
          <Link
            href={viewModel.financeCalculators.href}
            target={viewModel.financeCalculators.target}
          >
            <Typography>{viewModel.financeCalculators.label}</Typography>
          </Link>
          <DropdownLabelContainer onClick={viewModel.onDropdownClick}>
            <Typography>{viewModel.learningCenterLabel}</Typography>
            {viewModel.isDropdownOpen() ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )}
            {viewModel.isDropdownOpen() && (
              <Dropdown>
                {viewModel.learningCenterLinks.map((link) => {
                  return (
                    <DropdownLink
                      key={link.href}
                      href={link.href}
                      target={link.target}
                    >
                      <Typography>{link.label}</Typography>
                    </DropdownLink>
                  );
                })}
              </Dropdown>
            )}
          </DropdownLabelContainer>
          <Link href={viewModel.contactUs.href}>
            <Typography>{viewModel.contactUs.label}</Typography>
          </Link>
          <Link
            href={viewModel.backToCorporate.href}
            target={viewModel.backToCorporate.target}
          >
            <Typography>{viewModel.backToCorporate.label}</Typography>
          </Link>
        </DesktopView>
        <MobileView>
          <ShopNowContainer href={viewModel.shopNow.href}>
            <ShopIcon />
            <ShopLabel>{viewModel.shopNow.label}</ShopLabel>
          </ShopNowContainer>
        </MobileView>
      </Bottom>
    </ViewContainer>
  );
};

export default observer(View);
