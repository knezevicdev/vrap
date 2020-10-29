import { styled } from '@material-ui/core/styles';
import React from 'react';

import Hiring from './Hiring';
import Locations from './Locations';
import SuperCenter from './SuperCenter';
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
