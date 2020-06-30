import { useTheme } from '@material-ui/core/styles';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect, useState } from 'react';

import Cars from 'src/modules/cars';
import {
  CarsStore,
  CarsStoreContext,
  getInitialCarsStoreState,
  InitialCarsStoreState,
} from 'src/modules/cars/store';
import Page from 'src/Page';

interface Props {
  initialStoreState: InitialCarsStoreState;
}

const CarsPage: NextPage<Props> = ({ initialStoreState }) => {
  // Persist store instance across URL updates.
  const [carsStore] = useState<CarsStore>(new CarsStore(initialStoreState));

  /* FIT-307. This effect allows the filters panel to be initially closed
  on mobile, and initially open on desktop. */
  const theme = useTheme();
  useEffect(() => {
    const mql = window.matchMedia(
      `(min-width: ${theme.breakpoints.values.sm}px)`
    );
    if (mql.matches) {
      carsStore.setAreFiltersOpen(true);
    }
  }, [carsStore, theme]);

  const title = 'Shop Used Cars Online - Rocket Auto';
  const description =
    'Buy your next car online with Rocket Auto. We offer certified used vehicles, easy car buying, and delivery anywhere in the USA.';

  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <Page name="Catalog" head={head}>
      <CarsStoreContext.Provider value={carsStore}>
        <Cars />
      </CarsStoreContext.Provider>
    </Page>
  );
};

CarsPage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
  const {
    query: { filters },
  } = context;
  const initialStoreState = await getInitialCarsStoreState(
    typeof filters === 'string' ? (filters as string) : undefined
  );
  return {
    initialStoreState,
  };
};

export default CarsPage;
