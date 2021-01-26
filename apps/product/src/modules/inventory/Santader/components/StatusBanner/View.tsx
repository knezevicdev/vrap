import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Banner = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  padding: theme.spacing(0, 2),
  width: 'fit-content',
  boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.15)',
  '&:after': {
    position: 'absolute',
    right: '-6px',
    top: '0',
    height: '24px',
    width: '20px',
    backgroundColor: 'inherit',
    transform: 'skewX(-23deg)',
    color: 'inherit',
    content: 'close-quote',
    quotes: 'none',
  },
}));

const Label = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '16px',
  paddingLeft: theme.spacing(2),
  [theme.breakpoints.only('xs')]: {
    paddingLeft: theme.spacing(5, 2),
  },
  letterSpacing: '1.25px',
  lineHeight: '24px',
}));

const StatusBannerView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const bannerInfo = viewModel.getBanner();
  if (!bannerInfo) {
    return null;
  }
  return (
    <Banner style={{ backgroundColor: bannerInfo.color }}>
      <Label>{bannerInfo.label}</Label>
    </Banner>
  );
};

export default observer(StatusBannerView);
