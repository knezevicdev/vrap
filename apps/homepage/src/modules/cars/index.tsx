import Grid from '@material-ui/core/Grid';
import { styled, useTheme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';

import PoweredByFooter from '../../components/footer/PoweredByFooter';
import SearchHeader from '../../components/header/SearchHeader';
import Filters from '../../modules/cars/components/Filters';
import Inventory from '../../modules/cars/components/Inventory';

const StyledGrid = styled(Grid)(() => ({
  flexGrow: 1,
}));

const Home: React.FC = () => {
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    const mql = window.matchMedia(
      `(min-width: ${theme.breakpoints.values.sm}px)`
    );

    if (mql.matches) {
      setAreFiltersOpen(true);
    }
  }, []);

  const toggleFiltersState = (): void => {
    setAreFiltersOpen(!areFiltersOpen);
  };

  return (
    <>
      <SearchHeader />
      <StyledGrid container direction="row" wrap="nowrap">
        <Filters
          toggleFiltersState={toggleFiltersState}
          areFiltersOpen={areFiltersOpen}
        />
        <Inventory
          toggleFiltersState={toggleFiltersState}
          areFiltersClosed={!areFiltersOpen}
        />
      </StyledGrid>
      <PoweredByFooter />
    </>
  );
};
export default Home;
