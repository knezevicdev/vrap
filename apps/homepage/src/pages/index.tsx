import { NextPage } from 'next';
import React from 'react';

import Home from 'src/modules/home';
import Page from 'src/Page';

const HomePage: NextPage = () => {
  const title = 'Vroom: Buy, Sell or Trade-In Used Vehicles Online';
  const description =
    'Buy, sell or trade-in a certified used car online from anywhere in the USA. We offer no-haggle car buying, top quality cars, full warranties & home shipping.';
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

export default HomePage;
