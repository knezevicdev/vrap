import { styled } from '@material-ui/core/styles';
import { Button } from '@vroom-web/ui';
import React from 'react';

import Highlight from './Highlight';
import ViewModel from './ViewModel';

const ViewContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  background: '#F5F5F5',
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
    maxWidth: '600px',
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(4, 2),
  },
}));

const ShopNow = styled(Button)(({ theme }) => ({
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

interface Props {
  viewModel: ViewModel;
}

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      <ViewContent>
        <Highlight />
        <ShopNow onClick={viewModel.handleButtonClick} variant="contained">
          {viewModel.button}
        </ShopNow>
      </ViewContent>
    </ViewContainer>
  );
};

export default View;
