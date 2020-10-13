import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import LandingBannerViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignSelf: 'center',
  backgroundColor: '#e6e8ea',
  margin: theme.spacing(2, 0),
  width: '40%',
  cursor: 'pointer',
  [theme.breakpoints.only('xs')]: {
    width: '92%',
  },
  '& :hover': {
    color: theme.palette.primary.main,
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(1, 0),
  alignSelf: 'center',
  width: '100%',
}));

interface Props {
  viewModel: LandingBannerViewModel;
}
const LandingBannerView: React.FC<Props> = ({ viewModel }) => {
  if (!viewModel.showJeepWranglerBanner()) {
    return null;
  }
  const handleClick = (): void => {
    viewModel.handleBannerClick();
  };
  return (
    <Container onClick={handleClick}>
      <StyledTypography>{viewModel.jeepWranglerText}</StyledTypography>
    </Container>
  );
};

export default observer(LandingBannerView);
