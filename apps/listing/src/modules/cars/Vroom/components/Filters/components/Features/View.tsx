import { observer } from 'mobx-react';
import React from 'react';

import FeaturesViewModel from './ViewModel';

interface Props {
  viewModel: FeaturesViewModel;
}

const FeaturesView: React.FC<Props> = ({ viewModel }) => {
  console.log(viewModel.getFiltersData());
  return <>hi guys</>;
};

export default observer(FeaturesView);
