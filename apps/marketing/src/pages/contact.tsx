import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import React from 'react';

import Contact from 'src/modules/contact';
import { BrandContext } from 'src/modules/contact/BrandContext';
import Page from 'src/Page';

interface Props {
  brand: Brand;
}

const ContactPage: NextPage<Props> = ({ brand }) => {
  return (
    <BrandContext.Provider value={brand}>
      <ThemeProvider brand={brand}>
        <Page name="Contact">
          <Contact />
        </Page>
      </ThemeProvider>
    </BrandContext.Provider>
  );
};

ContactPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const query = ctx.query;

  // FIT-570
  // TODO: replace this mechanism with the actual one.
  // Some data should come from ctx.req, rather than from query.
  const brandQueryParam = query.brand;
  const brand = brandQueryParam === 'santander' ? Brand.SANTANDER : Brand.VROOM;

  return { brand };
};

export default ContactPage;
