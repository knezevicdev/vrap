import { Brand, ThemeProvider } from '@vroom-web/ui';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import Locations from 'src/modules/locations';
import Page from 'src/Page';
import { determineWhitelabel } from 'src/utils/utils';

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

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  const brand = determineWhitelabel(ctx);
  const title = `Sell Us Your Car | Texas Direct Auto`;
  const description = `Sell your car online or at one of our convenient locations at Texas Direct Auto. We offer no haggle pricing for your trade, we'll even beat CarMax's offer!`;

  return { props: { brand, title, description } };
};

export default LocationsPage;
