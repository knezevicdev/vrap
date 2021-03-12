import React from 'react';
import Contact from 'src/modules/contact';
import Page from 'src/Page';
import getConfig from 'next/config';

import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import { BrandContext } from 'src/modules/contact/BrandContext';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { PageData, returnBrandConfig } from 'src/utils/utils';
import { ThemeProvider } from '@vroom-web/ui';

interface Props {
  brand: Brand;
  description: string;
  title: string;
  canonical: string;
}

const ContactPage: NextPage<Props> = ({
  brand,
  canonical,
  description,
  title,
}) => {
  const { publicRuntimeConfig } = getConfig();

  const head = (
    <>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
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
  const brandConfig = returnBrandConfig(brand, PageData.CONTACT);

  return {
    props: {
      brand,
      description: brandConfig.description,
      title: brandConfig.title,
      canonical: brandConfig.canonical,
    },
  };
};

export default ContactPage;
