import { styled } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Button, Typography } from '@vroom-web/ui';
import React, { useEffect, useState } from 'react';

import ViewModel from './ViewModel';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.secondary.main,
  display: 'flex',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.only('xs')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    marginRight: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.only('xs')]: {
    marginTop: theme.spacing(2),
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: 'auto',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const JuneteenthBannerView: React.FC<Props> = ({ viewModel }) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(viewModel.show());
  }, [viewModel]);

  const handleButtonClick = (): void => {
    viewModel.handleClickButton();
  };

  if (show) {
    return (
      <StyledToolbar>
        <StyledTypography
          fontWeight="fontWeightSemibold"
          letterSpacing="0.25px"
          lineHeight="1.3"
        >
          {viewModel.bannerText}
        </StyledTypography>
        <StyledButton onClick={handleButtonClick} variant="contained">
          {viewModel.buttonText}
        </StyledButton>
      </StyledToolbar>
    );
  }
  return null;
};

export default JuneteenthBannerView;
