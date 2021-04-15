/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-nested-ternary */

import { Experiment } from '@vroom-web/experiment-sdk';
import { ThemeProvider } from '@vroom-web/ui';
import { getVroomTheme } from '@vroom-web/ui-lib';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import experimentSDK from 'src/integrations/experimentSDK';
import Home from 'src/modules/home';
import { HomeStore, HomeStoreContext } from 'src/modules/home/store';
import Page from 'src/Page';
import { returnBrandConfig } from 'src/utils/utils';

interface Props {
  brand: Brand;
  canonical: string;
  description: string;
  query: {};
  title: string;
  experiments: Experiment[];
}

const HomePage: NextPage<Props> = ({
  brand,
  canonical,
  description,
  experiments,
  query,
  title,
}) => {
  const store = new HomeStore({
    query,
    experiments,
  });
  const head = (
    <>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <StyledThemeProvider theme={getVroomTheme()}>
        <Page brand={brand} name="Home" head={head}>
          <HomeStoreContext.Provider value={store}>
            <Home brand={brand} />
          </HomeStoreContext.Provider>
        </Page>
      </StyledThemeProvider>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  const brand = determineWhitelabel(ctx);
  const brandConfig = returnBrandConfig(brand);
  const experiments = await experimentSDK.getRunningExperiments({});

  return {
    props: {
      brand,
      description: brandConfig.description,
      query: { ...ctx.query },
      title: brandConfig.title,
      experiments,
      canonical: brandConfig.canonical,
    },
  };
};

export default HomePage;
