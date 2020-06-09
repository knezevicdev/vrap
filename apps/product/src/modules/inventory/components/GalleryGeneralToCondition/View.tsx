import Box from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';
import React from 'react';

import ViewModel from './ViewModel';

import Button from 'src/ui/Button';
import Container from 'src/ui/Container';
import Typography from 'src/ui/Typography';

const StyledImg = styled('img')(({ theme }) => ({
  width: '50%',
  height: 'auto',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const StyledContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'row',
  whiteSpace: 'normal',
  maxHeight: '60vh',
}));

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
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
