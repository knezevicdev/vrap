import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

import { BrandContext } from 'src/modules/contact/BrandContext';
import Page from 'src/Page';
import Locations from 'src/modules/locations';

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
  // const whitelabel = brandHeader || queryBrand;
  // if (whitelabel === Brand.SANTANDER) brand = Brand.SANTANDER;
  // else if (whitelabel === Brand.TDA) brand = Brand.TDA;

  // const getTitle = () => {
  //   const locations = 'Locations';
  //   if (brand === Brand.SANTANDER)
  //     return `${locations} - Santander Consumer USA`;
  //   if (brand === Brand.TDA) return `Locations - Texas Direct Auto`;
  //   return `${locations}`;
  // };

  const title = `Locations - Texas Direct Auto`;

  return { brand, title };
};

export default LocationsPage;
