import Snackbar from '@material-ui/core/Snackbar';
import { styled } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
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
  const handleSnackbar = (
    _event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ): void => {
    if (reason === 'clickaway') {
      return;
    }
    viewModel.handleSnackbar();
  };
  React.useEffect(() => {
    viewModel.handleMount();
  }, [viewModel]);
  if (viewModel.isLoading()) {
    return null;
  }
  return (
    <>
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
      <LoggedOut viewModel={viewModel} />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={viewModel.isSnackbarOpen()}
        autoHideDuration={4000}
        onClose={handleSnackbar}
        message={<Typography>{viewModel.getSnarbarMessage()}</Typography>}
        action={
          <>
            <CloseIcon fontSize="small" onClick={handleSnackbar} />
          </>
        }
      />
    </>
  );
};
export default observer(FavoritesView);
