import { observer } from 'mobx-react';
import React from 'react';

import PriceDetailViewModel from './ViewModel';

import InitialPrice from 'src/components/InitialPrice';
import LoadingPrice from 'src/components/LoadingPrice';
import PendingPrice from 'src/components/PendingPrice';
import { StoreStatus } from 'src/interfaces.d';

interface Props {
  viewModel: PriceDetailViewModel;
}

const PriceDetailView: React.FC<Props> = ({ viewModel }) => {
  switch (viewModel.status) {
    case StoreStatus.Initial:
      return <LoadingPrice />;

    case StoreStatus.Success:
      return viewModel.automated ? (
        <InitialPrice store={viewModel.store} />
      ) : (
        <PendingPrice />
      );

    case StoreStatus.Error:
      return <PendingPrice />;

    default:
      return null;
  }
};

export default observer(PriceDetailView);
