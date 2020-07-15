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
  left: theme.spacing(3),
  padding: theme.spacing(1),
}));

const Label = styled(Typography)(() => ({
  fontWeight: 600,
  fontSize: '12px',
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
