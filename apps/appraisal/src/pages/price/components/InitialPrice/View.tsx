import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Container, Button } from '@vroom-web/ui';

const StyledContainer = styled(Container)(({ theme }) => ({
  backgroundColor: 'white',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    flexGrow: 0,
    minWidth: 'auto',
    minHeight: '53px',
    maxHeight: '53px',
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: '45px',
    maxHeight: '45px',
  },
  background: '#EC0000',
  color: '#FFFFFF',
  fontWeight: 'bold',
  '&:hover': {
    background: '#CC0000',
  },
  '&:active': {
    background: '#990000',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const handleButtonClick = (
  event: React.MouseEvent<HTMLButtonElement>
): void => {
  event.preventDefault();
  // viewModel.navigateUsingSearch();
};

const InitialPriceView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledContainer>
      <div>{viewModel.yourPrice}</div>
      <StyledButton onClick={handleButtonClick} variant="contained">
        {viewModel.continuePrice}
      </StyledButton>
    </StyledContainer>
  );
};

export default InitialPriceView;
