import { styled } from '@material-ui/core/styles';

import { ReactComponent as HeartFilledSvg } from '../../svg/heart-filled.svg';

const FavoritesHeartIconComponent = styled(HeartFilledSvg)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));

export default FavoritesHeartIconComponent;
