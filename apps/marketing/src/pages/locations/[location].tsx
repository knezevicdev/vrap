import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

import Location from 'src/modules/locations/location';
import Page from 'src/Page';
import { getLocations } from 'src/modules/locations/getLocations';

interface Props {
  brand: Brand;
  title: string;
  tdalocation: any;
}

const LocationPage: NextPage<Props> = ({ brand, title, tdalocation }) => {
  const head = (
    <>
      <title>{title}</title>
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="Locations" head={head}>
        <Location />
      </Page>
    </ThemeProvider>
  );
};

LocationPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const query = ctx.query;

  const brand = Brand.TDA;
  const title = `Locations - Texas Direct Auto`;

  const queryLocation = query.location;
  const tdalocation = getLocations().find(
    (location) => location.path === queryLocation
  );

  return { brand, title, tdalocation };
};

export default LocationPage;
