import { Brand, ThemeProvider } from '@vroom-web/ui';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import React from 'react';

import { getLocations, LocationInfo } from 'src/modules/locations/getLocations';
import Location from 'src/modules/locations/location';
import Page from 'src/Page';
interface Props {
  brand: Brand;
  title: string;
  tdalocation: LocationInfo;
}

const LocationPage: NextPage<Props> = ({ brand, title, tdalocation }) => {
  const head = <title>{title}</title>;

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="Locations" head={head}>
        <Location locationInfo={tdalocation} />
      </Page>
    </ThemeProvider>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const queryLocation = ctx.params?.location;

  const brand = Brand.TDA;
  const title = `Locations - Texas Direct Auto`;

  const tdalocation = getLocations().find(
    (location) => location.path === queryLocation
  );

  const notFound = tdalocation ? true : false;

  return { props: { brand, title, tdalocation, notFound } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const locations = getLocations();

  // Get the paths we want to pre-render based on locations
  const paths = locations.map((location) => ({
    params: { location: location.path },
  }));

  // We'll pre-render only these paths at build time.
  return { paths, fallback: false };
};

export default LocationPage;
