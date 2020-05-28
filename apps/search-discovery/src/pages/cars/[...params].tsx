import { useTheme } from '@material-ui/core/styles';
import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';

import Page from 'src/components/Page';
import Cars from 'src/modules/cars';
import {
  CarsStore,
  CarsStoreContext,
  getInitialCarsStoreState,
  InitialCarsStoreState,
} from 'src/modules/cars/store';

interface Props {
  initialStoreState: InitialCarsStoreState;
}

const CarsPage: NextPage<Props> = ({ initialStoreState }) => {
  /* FIT-307. TODO: consider moving this store into _app.tsx,
  so that one store instances is persisted across pages.
  Placing the store in local state is an edge case because of how next currently works.
  We want the page's state persisted as the user filters.
  The tricky part is that clicking a filters updates the url and causes a nextjs navigation.
  Since both [...params] and index routes use this component,
  it will actually stay mounted across filter navigations.
  By putting the store instance in local state, it will persist across navigations.
  The effect below allows us to update the store based on the data fetched in GIP. */
  const [carsStore] = useState(new CarsStore(initialStoreState));
  useEffect(() => {
    /* This will cause an additional re-render on the page,
    for components that are observing the store.
    Given that changing pages will cause a rerender and
    updating the store will cause a separate rerender,
    this may be a necessary evil unless we can combine
    both cars pages into one. */
    carsStore.resetToInitialState(initialStoreState);
  }, [carsStore, initialStoreState]);

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

  /* FIT-307. This effect sets up route listeners,
  so we can show a loading state while we fetch data for
  a new filter selection. This is an edge case.
  We are only doing a loading state
  this way because loading occurs across pages. */
  useEffect(() => {
    const handleRouteChangeStart = (url: string): void => {
      const filtersFromPath = url.split('?filters=');
      const filters =
        filtersFromPath.length > 1 ? filtersFromPath[1] : undefined;
      carsStore.setInventoryStatusLoading();
      carsStore.setFilters(filters);
    };
    Router.events.on('routeChangeStart', handleRouteChangeStart);
    return function cleanup(): void {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [carsStore]);

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
