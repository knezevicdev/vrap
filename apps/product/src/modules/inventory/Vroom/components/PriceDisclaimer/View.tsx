import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const PriceDisclaimerView: React.FC<Props> = ({ viewModel }) => {
  return <div>{viewModel.title}</div>;
};

export default PriceDisclaimerView;
