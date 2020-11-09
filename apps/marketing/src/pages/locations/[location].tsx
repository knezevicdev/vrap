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
  description: string;
  carCenter?: LocationInfo;
}

const LocationPage: NextPage<Props> = ({
  brand,
  title,
  description,
  carCenter,
}) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

  if (!carCenter) return <Error statusCode={404} />;

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

  let title = ``;
  let description = ``;

  const queryLocation = query.location;

  const carCenter = getLocations().find(
    (location) => location.path === queryLocation
  );

  if (carCenter) {
    title = `Sell Us Your Car Location - ${carCenter.name}, ${carCenter.address.state}`;
    description = `Sell your car online or at the ${carCenter.name}, ${carCenter.address.state} location of Texas Direct Auto. We offer no haggle pricing for your trade, we'll even beat CarMax's offer!`;
  }

  return { brand, title, description, carCenter };
};

export default LocationPage;
