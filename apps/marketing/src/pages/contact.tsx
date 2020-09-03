import { Brand, ThemeProvider } from '@vroom-web/ui';
import { NextPage, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';

import Contact from 'src/modules/contact';
import { BrandContext } from 'src/modules/contact/BrandContext';
import { PhoneNumberContext } from 'src/modules/contact/PhoneNumberContext';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  description: string;
  title: string;
  phoneNumber: string;
}

const ContactPage: NextPage<Props> = ({
  brand,
  description,
  title,
  phoneNumber,
}) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <BrandContext.Provider value={brand}>
      <PhoneNumberContext.Provider value={phoneNumber}>
        <ThemeProvider brand={brand}>
          <Page brand={brand} name="Contact" head={head}>
            <Contact />
          </Page>
        </ThemeProvider>
      </PhoneNumberContext.Provider>
    </BrandContext.Provider>
  );
};

ContactPage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const query = ctx.query;

  const { req } = ctx;
  const headerBrandKey = 'x-brand';
  const santanderKey = 'santander';
  const brandHeader = req && req.headers[headerBrandKey];
  const queryBrand = query.brand;
  const cookies = parseCookies(ctx);
  const phoneNumber = cookies.sitePhoneNumber || '(855) 524-1300';

  const brand =
    (brandHeader || queryBrand) == santanderKey ? Brand.SANTANDER : Brand.VROOM;

  const title =
    brand === Brand.SANTANDER ? 'Contact Us - Santander Consumer USA' : '';

  const description =
    brand === Brand.SANTANDER
      ? 'Call 1-888-222-4227 about your Santander Consumer USA account or call 1-855-659-0278 about purchasing a vehicle. We’re here to help.'
      : '';

  return { brand, description, title, phoneNumber };
};

export default ContactPage;
