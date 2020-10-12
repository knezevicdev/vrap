import { observer } from 'mobx-react';
import React from 'react';

import LandingBannerViewModel from './ViewModel';

interface Props {
  viewModel: LandingBannerViewModel;
}
const LandingBannerView: React.FC<Props> = ({ viewModel }) => {
  if (!viewModel.showJeepWranglerBanner()) {
    return null;
  }
  return <div>{viewModel.jeepWranglerText}</div>;
};

export default observer(LandingBannerView);
