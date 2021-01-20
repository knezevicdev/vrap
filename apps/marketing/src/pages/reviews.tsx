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

interface Props {
  brand: Brand;
  title: string;
  description: string;
  reviews: Partial<ContextState>;
}

const ReviewsPage: NextPage<Props> = ({
  brand,
  title,
  description,
  reviews,
}) => {
  const head = (
    <>
      <title>{title}</title>
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
  const title = 'Vroom Reviews & Testimonials | Vroom.com';
  const description = `Vroom believes buying a car should be fun, easy, and affordable. Visit and see what our customers have to say about the Vroom car buying process.`;

  const summary = await getSummary();
  const highlights = await getHighlights();

  const reviews = { summary, highlights };

  return { props: { brand, title, description, reviews } };
};

export default ReviewsPage;
