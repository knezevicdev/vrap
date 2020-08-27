import Grid from '@material-ui/core/Grid';
import { styled } from '@material-ui/core/styles';
import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import Filters from './components/Filters';
import Inventory from './components/Inventory';

const StyledGrid = styled(Grid)(() => ({
  flexGrow: 1,
}));

const { publicRuntimeConfig } = getConfig();

const Vroom: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <StyledGrid container direction="row" wrap="nowrap">
        <Filters />
        <Inventory />
      </StyledGrid>
      <StandardFooter />
    </>
  );
};

export default Vroom;
