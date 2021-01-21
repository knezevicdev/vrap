import { observer } from 'mobx-react';
import React from 'react';

import AsyncIndicatorViewModel from './ViewModel';

import Loading from 'src/components/Loading';

interface Props {
  viewModel: AsyncIndicatorViewModel;
}

const AsyncIndicator: React.FC<Props> = ({ viewModel }) => {
  if (!viewModel.isRequesting) return null;

  return <Loading />;
};

export default observer(AsyncIndicator);
