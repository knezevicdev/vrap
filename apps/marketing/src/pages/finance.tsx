import { ThemeProvider } from '@vroom-web/ui';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import Finance from 'src/modules/finance';
import Page from 'src/Page';

import { PageData, returnBrandConfig } from 'src/utils/utils';

interface Props {
  brand: Brand;
  canonical: string;
  description: string;
  title: string;
}

const FinancePage: NextPage<Props> = ({ 
  brand, 
  canonical, 
  description, 
  title, 
}) => {
  const head = (
    <>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="Finance" head={head}>
        <Finance />
      </Page>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  const brand = determineWhitelabel(ctx);
  const brandConfig = returnBrandConfig(brand, PageData.FINANCE);

  return { props: { 
    brand, 
    description: brandConfig.description,
    title: brandConfig.title, 
    canonical: brandConfig.canonical, 
  } };
};

export default FinancePage;
