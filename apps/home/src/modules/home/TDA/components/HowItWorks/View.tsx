import { styled } from '@material-ui/core/styles';
import { Typography } from '@vroom-web/ui';
import React from 'react';

import Step from './Step';
import ViewModel from './ViewModel';

const ViewContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  background: '#FFFFFF',
}));

const ViewContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(8),
  maxWidth: '1280px',
  margin: '0 auto',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(8, 4),
    maxWidth: '500px',
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(4, 2),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#444444',
  fontSize: '30px',
  fontFamily: 'RingsideCompressed',
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4),
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '22px',
    marginBottom: theme.spacing(4),
    fontWeight: 'bold',
  },
}));

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <ViewContent>
        <Title>{viewModel.title}</Title>
        <Step />
      </ViewContent>
    </ViewContainer>
  );
};

export default View;
