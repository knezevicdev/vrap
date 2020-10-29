import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import Error from 'next/error';

import React from 'react';

import Locations from 'src/modules/locations';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  title: string;
}

const LocationsPage: NextPage<Props> = ({ brand, title }) => {
  const head = <title>{title}</title>;

  if (brand !== Brand.TDA) return <Error statusCode={404} />;

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="Locations" head={head}>
        <Locations />
      </Page>
    </ThemeProvider>
  );
};

LocationsPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<Props> => {
  const query = ctx.query;

  const { req } = ctx;
  const headerBrandKey = 'x-brand';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;

  let brand = Brand.VROOM;
  const whitelabel = brandHeader || queryBrand;
  if (whitelabel === Brand.TDA) brand = Brand.TDA;

  const title = `Locations - Texas Direct Auto`;

  return { brand, title };
};

export default LocationsPage;
