import { ThemeProvider } from '@vroom-web/ui';
import { Brand, determineWhitelabel } from '@vroom-web/whitelabel';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

import {
  ContextState,
  ReviewsContext,
} from '../modules/reviews/ReviewsContext';

import Reviews from 'src/modules/reviews';
import { getHighlights, getSummary } from 'src/modules/reviews/api/reviewsApi';
import Page from 'src/Page';

import { PageData, returnBrandConfig } from 'src/utils/utils';

interface Props {
  brand: Brand;
  canonical: string;
  description: string;
  reviews: Partial<ContextState>;
  title: string;
}

const ReviewsPage: NextPage<Props> = ({
  brand, 
  canonical, 
  description, 
  reviews,
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
      <Page brand={brand} name="Reviews" head={head}>
        <ReviewsContext.Provider value={reviews}>
          <Reviews />
        </ReviewsContext.Provider>
      </Page>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  ctx: GetServerSidePropsContext
) => {
  ctx.res.setHeader('Cache-Control', '');
  const brand = determineWhitelabel(ctx);
  const brandConfig = returnBrandConfig(brand, PageData.REVIEWS);
  const summary = await getSummary();
  const highlights = await getHighlights();

  const reviews = { summary, highlights };

  return { props: { 
    brand, 
    description: brandConfig.description,
    title: brandConfig.title, 
    canonical: brandConfig.canonical, 
    reviews 
  } };
};

export default ReviewsPage;
