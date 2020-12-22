import { ThemeProvider } from '@vroom-web/ui';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import Finance from 'src/modules/finance';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  title: string;
}

const FinancePage: NextPage<Props> = ({ brand, title }) => {
  const head = (
    <>
      <title>{title}</title>
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="How it Works" head={head}>
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
  const title = 'Finance';

  return { props: { brand, title } };
};

export default FinancePage;
