import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

import Locations from 'src/modules/locations';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  title: string;
  description: string;
}

const LocationsPage: NextPage<Props> = ({ brand, title, description }) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

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

  const title = `Sell Us Your Car | Texas Direct Auto`;
  const description = `Sell your car online or at one of our convenient locations at Texas Direct Auto. We offer no haggle pricing for your trade, we'll even beat CarMax's offer!`;

  return { brand, title, description };
};

export default LocationsPage;
