import { styled } from '@material-ui/core/styles';
import { Button, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(8, 8, 8, 8),
  maxWidth: '1280px',
  margin: '0 auto',
  fontFamily: 'Calibre',
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(8, 2),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: 'black',
  lineHeight: '48x',
  fontSize: '48px',
  letterSpacing: '1px',
  fontWeight: 700,
  fontFamily: 'RingsideCompressed',
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  [theme.breakpoints.down('xs')]: {
    fontSize: '32px',
    lineHeight: '32px',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const StyledButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  height: '48px',
  width: '280px',
  background: '#EC0000',
  color: '#FFFFFF',
  fontWeight: 'bold',
  '&:hover': {
    background: '#CC0000',
  },
  '&:active': {
    background: '#990000',
  },
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: { width: '100%' },
}));

const View: React.FC<Props> = ({
  viewModel: { title, buttonText, handleButtonClick },
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <StyledButton onClick={handleButtonClick} variant="contained">
        {buttonText}
      </StyledButton>
    </Container>
  );
};

export default View;
