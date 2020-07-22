import { styled } from '@material-ui/core/styles';
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
  [theme.breakpoints.only('xs')]: { padding: theme.spacing(1, 0) },
}));

const Bottom = styled('div')(({ theme }) => ({
  display: 'flex',
  color: '#767676',
  background: '#FFFFFF',
  maxHeight: '48px',
  minHeight: '48px',
  padding: theme.spacing(1, 2),
  [theme.breakpoints.only('xs')]: { padding: theme.spacing(1, 3) },
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
