import { NextPage } from 'next';
import React from 'react';

import Home from 'src/modules/home';
import Page from 'src/Page';

interface Props {
  title: string;
  description: string;
}

const HomePage: NextPage<Props> = ({ title, description }) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <Page name="Home" head={head}>
      <Home />
    </Page>
  );
};

HomePage.getInitialProps = async (): Promise<Props> => {
  // const title = 'Vroom: Buy, Sell or Trade-In Used Vehicles Online';
  const title = 'Oh Hello There';
  const description =
    'Buy, sell or trade-in a certified used car online from anywhere in the USA. We offer no-haggle car buying, top quality cars, full warranties & home shipping.';
  return {
    title,
    description,
  };
};

export default HomePage;
