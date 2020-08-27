import { styled, Typography } from '@material-ui/core';
import React from 'react';

import ViewModel from './ViewModel';

type Props = {
  viewModel: ViewModel;
};

const SalesContactContainer = styled('div')(({ theme }) => ({
  maxWidth: '1280px',
  width: '100%',
  margin: theme.spacing(1.75, 'auto'),
  padding: theme.spacing(0, 3),
  textAlign: 'right',
  fontSize: '20px',
  [theme.breakpoints.down('xs')]: { textAlign: 'center', fontSize: '16px' },
}));

const Question = styled(Typography)(() => ({
  display: 'inline',
  fontWeight: 600,
}));

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <SalesContactContainer>
      <Typography>
        <Question>{viewModel.title} </Question>
        {viewModel.body}
      </Typography>
    </SalesContactContainer>
  );
};

export default View;
