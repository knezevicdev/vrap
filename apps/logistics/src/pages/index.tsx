import { NextPage } from 'next';
import React from 'react';

import Page from 'src/components/Page';
import Home from 'src/modules/home';

const HomePage: NextPage = () => (
  <Page name="Logistics">
    <Home />
  </Page>
);

export default HomePage;
