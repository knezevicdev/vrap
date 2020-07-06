import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import React from 'react';

import Filters from './components/Filters';
import Inventory from './components/Inventory';

const StyledGrid = styled(Grid)(() => ({
  flexGrow: 1,
}));

const Cars: React.FC = () => {
  return (
    <>
      <SimpleHeader />
      <StyledGrid container direction="row" wrap="nowrap">
        <Filters />
        <Inventory />
      </StyledGrid>
      <StandardFooter />
    </>
  );
};

export default Cars;
