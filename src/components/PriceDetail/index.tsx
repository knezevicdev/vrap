import { observer } from 'mobx-react';
import React from 'react';

import { StoreStatus } from '../../interfaces.d';
import InitialPrice from '../InitialPrice';
import LoadingPrice from '../LoadingPrice';
import PendingPrice from '../PendingPrice';

import { PriceStore } from 'src/modules/price/store';

const PriceDetail: React.FC<{ store: PriceStore }> = ({ store }) => {
  switch (store.storeStatus) {
    case StoreStatus.Initial:
      return <LoadingPrice />;

    case StoreStatus.Success:
      return store.price.automatedAppraisal ? (
        <InitialPrice store={store} />
      ) : (
        <PendingPrice />
      );

    case StoreStatus.Error:
      return <PendingPrice />;

    default:
      return null;
  }
};

export default observer(PriceDetail);
