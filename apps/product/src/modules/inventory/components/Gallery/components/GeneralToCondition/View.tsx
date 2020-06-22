import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import ViewModel from './ViewModel';

import Button from 'src/ui/Button';
import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

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

const StyledButton = styled(Button)(() => ({
  height: '80px',
}));

interface Props {
  viewModel: ViewModel;
}

const GalleryConditionEndView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <StyledBox>
        <StyledButton
          variant="outlined"
          color="primary"
          size="large"
          onClick={viewModel.goToCondition}
        >
          <Typography variant="body1" fontWeight="fontWeightMedium">
            {viewModel.goToConditionText}
          </Typography>
        </StyledButton>
      </StyledBox>
      <StyledImg
        alt={viewModel.defaultImage.alt}
        src={viewModel.defaultImage.src}
      />
    </StyledContainer>
  );
};

export default GalleryConditionEndView;
