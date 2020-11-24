/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-nested-ternary */

import { ThemeProvider } from '@vroom-web/ui';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import Home from 'src/modules/home';
import { HomeStore, HomeStoreContext } from 'src/modules/home/store';
import Page from 'src/Page';
import { returnBrandConfig } from 'src/utils/utils';

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
        <HomeStoreContext.Provider value={store}>
          <Home brand={brand} />
        </HomeStoreContext.Provider>
      </Page>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  const brand = determineWhitelabel(ctx);
  const brandConfig = returnBrandConfig(brand);
  return {
    props: {
      brand,
      description: brandConfig.description,
      query: { ...ctx.query },
      title: brandConfig.title,
    },
  };
};

export default HomePage;
