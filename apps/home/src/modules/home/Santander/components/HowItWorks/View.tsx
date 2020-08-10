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
  [theme.breakpoints.only('sm')]: {
    padding: theme.spacing(8, 4),
  },
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(4, 2),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  color: '#444444',
  fontSize: '30px',
  fontFamily: 'SantanderHeadline',
  marginBottom: theme.spacing(6),
  textAlign: 'center',
  [theme.breakpoints.only('sm')]: {
    marginBottom: theme.spacing(4),
    textAlign: 'left',
  },
  [theme.breakpoints.only('xs')]: {
    fontSize: '22px',
    marginBottom: theme.spacing(4),
    textAlign: 'left',
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
