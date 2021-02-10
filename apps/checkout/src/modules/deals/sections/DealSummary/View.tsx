import React from 'react';

import DealSummary from './DealCard';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const View = ({ viewModel }: Props): JSX.Element => {
  const { dealProps, vehicleProps, tradeProps } = viewModel;
  return (
    <DealSummary deal={dealProps} vehicle={vehicleProps} trades={tradeProps} />
  );
};

export default View;
