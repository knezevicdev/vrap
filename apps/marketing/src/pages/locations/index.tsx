import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

import { BrandContext } from 'src/modules/contact/BrandContext';
import Locations from 'src/modules/locations';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  title: string;
}

const LocationsPage: NextPage<Props> = ({ brand, title }) => {
  const head = (
    <>
      <title>{title}</title>
    </>
  );

  return (
    // <BrandContext.Provider value={brand}>
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="Locations" head={head}>
        <Locations />
      </Page>
    </ThemeProvider>
    // </BrandContext.Provider>
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

  let brand = Brand.TDA;
  const whitelabel = brandHeader || queryBrand;
  if (whitelabel === Brand.SANTANDER) brand = Brand.SANTANDER;
  else if (whitelabel === Brand.TDA) brand = Brand.TDA;

  const title = `Locations - Texas Direct Auto`;

  return { brand, title };
};

export default LocationsPage;
