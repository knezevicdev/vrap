import { styled } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled(Typography)(({ theme }) => ({
  display: 'flex',
  paddingTop: theme.spacing(2),
  color: theme.palette.primary.main,
  cursor: 'pointer',
}));

const FavoritesView: React.FC<Props> = (props) => {
  const { viewModel } = props;

  const handleClick = (): void => {
    viewModel.isFavorited()
      ? viewModel.removeFavorite()
      : viewModel.addFavorite();
  };

  React.useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);
  return (
    <Container onClick={handleClick}>
      {!viewModel.isLoading() && viewModel.isFavorited() ? (
        <>
          <FavoriteIcon /> {viewModel.favorited}
        </>
      ) : (
        <>
          <FavoriteBorderIcon />
          {viewModel.addToFavorites}
        </>
      )}
    </Container>
  );
};

export default observer(FavoritesView);
