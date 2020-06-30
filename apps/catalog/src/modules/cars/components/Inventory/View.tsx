import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import React from 'react';

import Cars from './components/Cars';
import Pagination from './components/Pagination';
import TopSection from './components/TopSection';
import ViewModel from './ViewModel';

const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.only('xs')]: {
    padding: '0',
  },
  padding: theme.spacing(4, 2),
  borderBottom: 'solid 1px #bebebe',
}));

interface Props {
  viewModel: ViewModel;
}

const InventoryView: React.FC<Props> = ({ viewModel }) => {
  return (
    <StyledGrid container direction="column">
      <TopSection />
      <Cars />
      {!viewModel.hidePagination() && <Pagination />}
    </StyledGrid>
  );
};

export default observer(InventoryView);
