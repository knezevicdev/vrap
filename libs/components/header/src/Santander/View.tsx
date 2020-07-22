import { styled } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Typography } from '@vroom-web/ui';
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
}));

const Top = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
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
}));

const Logo = styled(LogoSvg)(() => ({
  width: '295px',
}));

const DesktopShopNow = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.only('xs')]: { display: 'none' },
}));

const MobileShopNow = styled('div')(({ theme }) => ({
  display: 'none',
  marginLeft: 'auto',
  [theme.breakpoints.only('xs')]: { display: 'flex' },
}));

const ShopNowContainer = styled('a')(() => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
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
  [theme.breakpoints.only('xs')]: { display: 'none' },
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
  '& >p': {
    fontSize: '16px',
  },
  marginRight: theme.spacing(4),
  [theme.breakpoints.only('xs')]: { display: 'none' },
  cursor: 'pointer',
  position: 'relative',
}));

const Dropdown = styled('div')(({ theme }) => ({
  position: 'absolute',
  background: '#FFFFFF',
  top: '37px',
  padding: theme.spacing(2),
  boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.15)',
}));

const ExpandLessIcon = styled(ExpandLess)(() => ({
  marginTop: '4px',
  height: '22px',
}));

const ExpandMoreIcon = styled(ExpandMore)(() => ({
  marginTop: '4px',
  height: '22px',
}));

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <Top>
        <Logo />
        <DesktopShopNow>
          <ShopNowContainer href={viewModel.shopNow.href}>
            <ShopIcon />
            <ShopLabel>{viewModel.shopNow.label}</ShopLabel>
          </ShopNowContainer>
        </DesktopShopNow>
      </Top>
      <Bottom>
        <Link
          href={viewModel.financeCalculators.href}
          target={viewModel.financeCalculators.target}
        >
          <Typography>{viewModel.financeCalculators.label}</Typography>
        </Link>
        <DropdownLabelContainer>
          <Typography>{viewModel.learningCenterLabel}</Typography>
          <ExpandMoreIcon />
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
        <MobileShopNow>
          <ShopNowContainer href={viewModel.shopNow.href}>
            <ShopIcon />
            <ShopLabel>{viewModel.shopNow.label}</ShopLabel>
          </ShopNowContainer>
        </MobileShopNow>
      </Bottom>
    </ViewContainer>
  );
};

export default View;
