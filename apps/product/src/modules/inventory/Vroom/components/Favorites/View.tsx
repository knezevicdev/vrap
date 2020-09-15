import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const FavoritesView: React.FC<Props> = (props) => {
  const { viewModel } = props;

  React.useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);

  return <div>{viewModel.addToFavorites}</div>;
};

export default observer(FavoritesView);
