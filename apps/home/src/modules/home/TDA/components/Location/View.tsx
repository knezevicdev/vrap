import { styled } from '@material-ui/core/styles';
import React from 'react';

import Hiring from './Hiring';
import Locations from './Locations';
import SuperCenter from './SuperCenter';
import ViewModel from './ViewModel';

const Container = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(0, 8, 8),
  margin: '0 auto',
  fontFamily: 'Calibre',
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(8, 2),
  },
}));

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = () => {
  return (
    <Container>
      <SuperCenter />
      <Locations />
      <Hiring />
    </Container>
  );
};

export default View;
