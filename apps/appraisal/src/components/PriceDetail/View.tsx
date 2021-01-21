import { observer } from 'mobx-react';
import React from 'react';

import PriceDetailViewModel from './ViewModel';

import InitialPrice from 'src/components/InitialPrice';
import LoadingPrice from 'src/components/LoadingPrice';
import PendingPrice from 'src/components/PendingPrice';
import { PriceStoreStatus } from 'src/modules/price/store';

interface Props {
  viewModel: PriceDetailViewModel;
}

const PriceDetailView: React.FC<Props> = ({ viewModel }) => {
  switch (viewModel.status) {
    case PriceStoreStatus.Initial:
      return <LoadingPrice />;

    case PriceStoreStatus.Success:
      return viewModel.automated ? (
        <InitialPrice store={viewModel.store} />
      ) : (
        <PendingPrice />
      );

    case PriceStoreStatus.Error:
      return <PendingPrice />;

    default:
      return null;
  }
};

export default observer(PriceDetailView);
