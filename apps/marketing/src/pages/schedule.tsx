import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import Schedule from 'src/modules/schedule';
import { BrandContext } from 'src/modules/schedule/BrandContext';
import { QueryContext } from 'src/modules/schedule/QueryContext';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  query: ParsedUrlQuery;
}

const SchedulePage: NextPage<Props> = ({ brand, query }) => {
  return (
    <BrandContext.Provider value={brand}>
      <QueryContext.Provider value={query}>
        <ThemeProvider brand={brand}>
          <Page name="Contact">
            <Schedule />
          </Page>
        </ThemeProvider>
      </QueryContext.Provider>
    </BrandContext.Provider>
  );
};

SchedulePage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const { req, query } = ctx;
  const headerBrandKey = 'x-brand';
  const santanderKey = 'santander';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;
  const brand =
    (brandHeader || queryBrand) == santanderKey ? Brand.SANTANDER : Brand.VROOM;

  return { brand, query };
};

export default SchedulePage;
