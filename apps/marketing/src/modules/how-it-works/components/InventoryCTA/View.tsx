import { styled } from '@material-ui/core';
import { Button, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(10, 6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 3),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textAlign: 'center',
  letterSpacing: '1px',
  [theme.breakpoints.only('xs')]: {
    marginBottom: theme.spacing(5),
  },
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(6),
  },
  [theme.breakpoints.down('lg')]: {
    fontSize: '42px',
    lineHeight: '46px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    lineHeight: '32px',
  },
}));

const InventoryCTAView: React.FC<Props> = ({ viewModel }) => {
  const { title, buttonLabel, carsLink } = viewModel;
  return (
    <Container>
      <Title variant="h2">{title}</Title>
      <Button variant="contained" color="primary" href={carsLink}>
        {buttonLabel}
      </Button>
    </Container>
  );
};

export default InventoryCTAView;
