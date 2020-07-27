import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const StyledImg = styled('img')(({ theme }) => ({
  width: '50%',
  height: '60vh',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  whiteSpace: 'normal',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.only('xs')]: {
    height: '44vh',
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: '60vh;',
  },
  [theme.breakpoints.only('xs')]: {
    height: '40vh',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const GeneralToConditionView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <StyledBox>
        <Button
          variant="contained"
          color="primary"
          onClick={viewModel.goToCondition}
        >
          <Typography variant="body1" fontWeight={600}>
            {viewModel.goToConditionText}
          </Typography>
        </Button>
      </StyledBox>
      <StyledImg
        alt={viewModel.defaultImage.alt}
        src={viewModel.defaultImage.src}
      />
    </StyledContainer>
  );
};

export default GeneralToConditionView;