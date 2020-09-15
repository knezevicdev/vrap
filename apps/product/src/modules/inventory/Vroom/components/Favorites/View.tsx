import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled(Typography)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const FavoritesView: React.FC<Props> = (props) => {
  const { viewModel } = props;

  const handleClick = (): void => {
    viewModel.addFavorite();
  };

  React.useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);
  return (
    <Container onClick={handleClick}>
      {!viewModel.isLoading() &&
        (viewModel.isFavorited()
          ? viewModel.favorited
          : viewModel.addToFavorites)}
    </Container>
  );
};

export default observer(FavoritesView);
