import Head from 'next/head';
import React from 'react';

import Landing from '../../../modules';

const LandingPage = () => {
  const title =
    '2019 Jeep Wrangler Specs, Trims, Features & Colors | Vroom.com';
  const description = `Learn more about the 2019 Jeep Wrangler, 
    including specifications & available trims. 
    Buy, sell or trade-in your Jeep Wrangler entirely online with Vroom.`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Landing />
    </>
  );
};

LandingPage.getInitialProps = async () => {
  return {};
};

export default LandingPage;
