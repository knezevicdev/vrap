import React, { useEffect } from 'react';

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
  const purchaseSummaryProps = viewModel.purchaseSummaryProps;

  useEffect(() => {
    viewModel.trackSuccess();
  }, [viewModel]);

  return (
    <>
      <ReservedCar {...reservedCarProps} />
      <Next {...nextProps} />
      <PurchaseSummary {...purchaseSummaryProps} />
    </>
  );
};

export default Success;
