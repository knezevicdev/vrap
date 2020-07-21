import React from 'react';
import Filters from "../Santander/components/Filters";
import Inventory from "../Santander/components/Inventory";
import {SantanderFooter} from "@vroom-web/footer-components";
import {styled} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const StyledGrid = styled(Grid)(() => ({
  flexGrow: 1,
}));

const Santander: React.FC = () => {
  return (
      <>
        <StyledGrid container direction="row" wrap="nowrap">
          <Filters />
          <Inventory />
        </StyledGrid>
        <SantanderFooter />
      </>
  );
};

export default Santander;
