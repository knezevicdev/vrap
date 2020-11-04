import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { SantanderFooter } from '@vroom-web/footer-components';
import { SantanderHeader } from '@vroom-web/header-components';
import React from 'react';

import Filters from '../Santander/components/Filters';
import Inventory from '../Santander/components/Inventory';

import getConfig from 'next/config';
const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

const StyledGrid = styled(Grid)(() => ({
  flexGrow: 1,
}));

const Santander: React.FC = () => {
  return (
    <>
      <SantanderHeader />
      <StyledGrid container direction="row" wrap="nowrap">
        <Filters />
        <Inventory />
      </StyledGrid>
      <SantanderFooter vroomUrl={VROOM_URL} />
    </>
  );
};

export default Santander;
