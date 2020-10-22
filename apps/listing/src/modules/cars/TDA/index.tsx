import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { TDAHeader } from '@vroom-web/header-components';
import React from 'react';

import Filters from './components/Filters';
import Inventory from './components/Inventory';

const StyledGrid = styled(Grid)(() => ({
  flexGrow: 1,
}));

// TODO: add TDA footer

const TDA: React.FC = () => {
  return (
    <>
      <TDAHeader />
      <StyledGrid container direction="row" wrap="nowrap">
        <Filters />
        <Inventory />
      </StyledGrid>
    </>
  );
};

export default TDA;
