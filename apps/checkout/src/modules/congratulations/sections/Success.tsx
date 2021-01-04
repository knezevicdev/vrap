import React from 'react';

import CongratsViewModel from '../ViewModel';
import Next from './Next';
import PurchaseSummary from './PurchaseSummary/PurchaseSummary';
import ReservedCar from './ReservedCar';

interface Props {
  viewModel: CongratsViewModel;
}

const Success: React.FC<Props> = ({ viewModel }): JSX.Element => {
  const reservedCarProps = viewModel.reservedCarProps;
  const nextProps = viewModel.nextProps;
  const purchaseSummaryViewModel = viewModel.purchaseSummaryProps;

  return (
    <>
      <ReservedCar {...reservedCarProps} />
      <Next {...nextProps} />
      <PurchaseSummary {...purchaseSummaryViewModel} />
    </>
  );
};

export default Success;
