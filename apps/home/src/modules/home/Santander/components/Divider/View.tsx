import { styled } from '@material-ui/core/styles';
import React from 'react';

const ViewContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  background: '#FFFFFF',
  justifyContent: 'center',
}));

const ViewContent = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: '1280px',
  padding: theme.spacing(0, 8),
  [theme.breakpoints.only('sm')]: {
    padding: theme.spacing(0, 4),
  },
  [theme.breakpoints.only('xs')]: {
    padding: theme.spacing(0, 2),
  },
}));

const Divider = styled('div')(() => ({
  border: 'solid 1px #F1F1F1',
}));

const View: React.FC = () => {
  return (
    <ViewContainer>
      <ViewContent>
        <Divider />
      </ViewContent>
    </ViewContainer>
  );
};

export default View;
