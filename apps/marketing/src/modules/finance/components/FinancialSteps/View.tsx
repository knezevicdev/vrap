import { styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(9, 6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4, 3),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
  letterSpacing: '1px',
  [theme.breakpoints.down('lg')]: {
    fontSize: '42px',
    lineHeight: '46px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '36px',
    lineHeight: '32px',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '28px',
    lineHeight: '32px',
  },
}));

const FinancialStepsView: React.FC<Props> = ({ viewModel }) => {
  const { title } = viewModel;
  return (
    <Container>
      <Title variant="h2">{title}</Title>
    </Container>
  );
};

export default FinancialStepsView;
