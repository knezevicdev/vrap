import { Brand, ThemeProvider } from '@vroom-web/ui';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import Contact from 'src/modules/contact';
import { BrandContext } from 'src/modules/contact/BrandContext';
import Page from 'src/Page';
import { determineWhitelabel } from 'src/utils/utils';

interface Props {
  brand: Brand;
  description: string;
  title: string;
}

const ContactPage: NextPage<Props> = ({ brand, description, title }) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <BrandContext.Provider value={brand}>
      <ThemeProvider brand={brand}>
        <Page brand={brand} name="Contact" head={head}>
          <Contact />
        </Page>
      </ThemeProvider>
    </BrandContext.Provider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  const brand = determineWhitelabel(ctx);

  const getTitle = (): string => {
    const contactUs = 'Contact Us';
    if (brand === Brand.SANTANDER)
      return `${contactUs} - Santander Consumer USA`;
    if (brand === Brand.TDA) return `${contactUs} - Texas Direct Auto`;
    return `${contactUs}`;
  };

  const getDescription = (): string => {
    if (brand === Brand.SANTANDER)
      return 'Call 1-888-222-4227 about your Santander Consumer USA account or call 1-855-659-0278 about purchasing a vehicle. We’re here to help.';
    if (brand === Brand.TDA)
      return 'Texas Direct Auto is happy to help. Give us a call to speak with a representative.';
    return '';
  };

  const title = getTitle();

  const description = getDescription();

  return { props: { brand, description, title } };
};

export default ContactPage;
