import { observer } from 'mobx-react';
import React from 'react';

import LandingBannerViewModel from './ViewModel';

interface Props {
  viewModel: LandingBannerViewModel;
}
const LandingBannerView: React.FC<Props> = ({ viewModel }) => {
  console.log(viewModel.getFilterData());
  return <div>{viewModel.test}</div>;
};

export default observer(LandingBannerView);
