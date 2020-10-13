import { styled } from '@material-ui/core';
import { Typography } from '@vroom-web/ui';
import { observer } from 'mobx-react';
import React from 'react';

import CountViewModel from './ViewModel';

interface Props {
  viewModel: CountViewModel;
}

const CountContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.grey[700],
}));

const PaginationView: React.FC<Props> = ({ viewModel }) => {
  return (
    <CountContainer>
      <Typography>
        {viewModel.getCount()} {viewModel.getCountText()}
      </Typography>
    </CountContainer>
  );
};

export default observer(PaginationView);
