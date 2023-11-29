import React from 'react';

import { StoreStatus } from '../../interfaces.d';
import usePriceStore from '../../modules/price/store';
import InitialPrice from '../InitialPrice';
import LoadingPrice from '../LoadingPrice';
import PendingPrice from '../PendingPrice';

const PriceDetail: React.FC = () => {
  const storeStatus = usePriceStore((state) => state.storeStatus);
  const isAutomatedAppraisal = usePriceStore(
    (state) => state.price.automatedAppraisal
  );

  switch (storeStatus) {
    case StoreStatus.Initial:
      return <LoadingPrice />;

    case StoreStatus.Success:
      return isAutomatedAppraisal ? <InitialPrice /> : <PendingPrice />;

    case StoreStatus.Error:
      return <PendingPrice />;

    default:
      return null;
  }
};

export default PriceDetail;
