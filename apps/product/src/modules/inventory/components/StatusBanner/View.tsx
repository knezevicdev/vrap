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
  left: 0,
  padding: theme.spacing(0, 1),
}));

const StatusBannerView: React.FC<Props> = (props) => {
  const { viewModel } = props;
  const bannerInfo = viewModel.getBanner();
  if (!bannerInfo) {
    return null;
  }
  return (
    <Banner style={{ backgroundColor: bannerInfo.color }}>
      <Typography fontWeight="fontWeightMedium" lineHeight="24px">
        {bannerInfo.label}
      </Typography>
    </Banner>
  );
};

export default observer(StatusBannerView);
