import { Brand, ThemeProvider } from '@vroom-web/ui';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import Schedule from 'src/modules/schedule';
import { BrandContext } from 'src/modules/schedule/BrandContext';
import { QueryContext } from 'src/modules/schedule/QueryContext';
import Page from 'src/Page';
import { determineWhitelabel } from 'src/utils/utils';

interface Props {
  brand: Brand;
  query: ParsedUrlQuery;
}

const SchedulePage: NextPage<Props> = ({ brand, query }) => {
  return (
    <BrandContext.Provider value={brand}>
      <QueryContext.Provider value={query}>
        <ThemeProvider brand={brand}>
          <Page brand={brand} name="Contact">
            <Schedule />
          </Page>
        </ThemeProvider>
      </QueryContext.Provider>
    </BrandContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  const brand = determineWhitelabel(ctx);
  return { props: { brand, query: ctx.query } };
};

export default SchedulePage;
