import { observer } from 'mobx-react-lite';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const CongratsView: React.FC<Props> = ({ viewModel }) => {
  if (viewModel.loading) {
    return <p>Loading...</p>;
  }
  if (viewModel.error) {
    return <p>Error!</p>;
  }
  if (viewModel.empty) {
    return <p>Empty!</p>;
  }
  return <p>Success!</p>;
};

export default observer(CongratsView);
