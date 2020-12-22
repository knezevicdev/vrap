import { ThemeProvider } from '@vroom-web/ui';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import HowItWorks from 'src/modules/how-it-works';
import Page from 'src/Page';

interface Props {
  brand: Brand;
  title: string;
}

const HowItWorksPage: NextPage<Props> = ({ brand, title }) => {
  const head = (
    <>
      <title>{title}</title>
    </>
  );

  return (
    <ThemeProvider brand={brand}>
      <Page brand={brand} name="How it Works" head={head}>
        <HowItWorks />
      </Page>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  const brand = determineWhitelabel(ctx);

  const getTitle = (): string => {
    const title = 'How Vroom Works';
    if (brand === Brand.SANTANDER) return `Santander Consumer USA - ${title}`;
    if (brand === Brand.TDA) return `Texas Direct Auto - ${title}`;
    return `Vroom - ${title}`;
  };

  const title = getTitle();

  return { props: { brand, title } };
};

export default HowItWorksPage;
