import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import Error from 'next/error';
import React from 'react';

import Location from 'src/modules/location';
import { getLocations, LocationInfo } from 'src/modules/locations/getLocations';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  title: string;
  carCenter?: LocationInfo;
}

const LocationPage: NextPage<Props> = ({ brand, title, carCenter }) => {
  const head = <title>{title}</title>;

  if (brand !== Brand.TDA || !carCenter) return <Error statusCode={404} />;

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="Locations" head={head}>
        <Location locationInfo={carCenter} />
      </Page>
    </ThemeProvider>
  );
};

LocationPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const query = ctx.query;

  const { req } = ctx;
  const headerBrandKey = 'x-brand';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;

  let brand = Brand.VROOM;
  const whitelabel = brandHeader || queryBrand;
  if (whitelabel === Brand.TDA) brand = Brand.TDA;

  let title = `Sell Us Your Car Location`;

  const queryLocation = query.location;

  const carCenter = getLocations().find(
    (location) => location.path === queryLocation
  );

  if (carCenter) {
    title = `${title} - ${carCenter.name}, ${carCenter.address.state}`;
  }

  return { brand, title, carCenter };
};

export default LocationPage;
