import { styled } from '@material-ui/core/styles';
import React from 'react';

import Step from './Step';

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

const View: React.FC = () => {
  return (
    <ViewContainer>
      <ViewContent>
        <Step />
      </ViewContent>
    </ViewContainer>
  );
};

export default View;
