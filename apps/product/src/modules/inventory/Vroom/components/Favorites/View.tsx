import { styled } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import LoggedOut from './LoggedOut';
import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(2),
  color: theme.palette.primary.main,
  cursor: 'pointer',
  fontSize: '16px',
}));

const FavoritesView: React.FC<Props> = (props) => {
  const { viewModel } = props;

  const handleClick = (): void => {
    if (viewModel.isLoggedIn()) {
      viewModel.isFavorited()
        ? viewModel.removeFavorite()
        : viewModel.addFavorite();
    } else {
      viewModel.handleDialog();
    }
  };

  React.useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);
  return (
    <>
      <Container onClick={handleClick}>
        {!viewModel.isLoading() && viewModel.isFavorited() ? (
          <>
            <FavoriteIcon /> {viewModel.favorited}
          </>
        ) : (
          <>
            {!viewModel.isLoggedIn() && <LoggedOut viewModel={viewModel} />}
            <FavoriteBorderIcon />
            {viewModel.addToFavorites}
          </>
        )}
      </Container>
    </>
  );
};

export default observer(FavoritesView);
