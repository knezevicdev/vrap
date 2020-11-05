/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-nested-ternary */

import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

import Home from 'src/modules/home';
// import { BrandContext } from 'src/modules/home/BrandContext';
import { HomeStore, HomeStoreContext } from 'src/modules/home/store';
import Page from 'src/Page';
import { determineWhitelabel, returnBrandConfig } from 'src/utils/utils';

interface Props {
  brand: Brand;
  description: string;
  query: {};
  title: string;
}

const HomePage: NextPage<Props> = ({ brand, description, query, title }) => {
  const store = new HomeStore({
    query,
  });
  const head = (
    <>
      <title>{title}</title>
      <link rel="canonical" href="/" />
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="Home" head={head}>
        {/* <BrandContext.Provider value={brand}> */}
        <HomeStoreContext.Provider value={store}>
          <Home brand={brand} />
        </HomeStoreContext.Provider>
        {/* </BrandContext.Provider> */}
      </Page>
    </ThemeProvider>
  );
};

HomePage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const brand = determineWhitelabel(ctx);
  const brandConfig = returnBrandConfig(brand);

  return {
    brand,
    description: brandConfig.description,
    query: { ...ctx.query, brand: brandConfig.brandParam },
    title: brandConfig.title,
  };
};

export default HomePage;
