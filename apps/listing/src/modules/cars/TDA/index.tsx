import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import Filters from './components/Filters';
import Inventory from './components/Inventory';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();
const StyledGrid = styled(Grid)(() => ({
  flexGrow: 1,
}));

const TDA: React.FC = () => {
  return (
    <>
      <TDAHeader vroomUrl={VROOM_URL} />
      <StyledGrid container direction="row" wrap="nowrap">
        <Filters />
        <Inventory />
      </StyledGrid>
      <TDAFooter vroomUrl={VROOM_URL} />
    </>
  );
};

export default TDA;
