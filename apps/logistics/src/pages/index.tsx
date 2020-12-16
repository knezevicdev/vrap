import { NextPage } from 'next';
import React from 'react';

import Page from 'src/components/Page';
import Home from 'src/modules/Home';

const HomePage: NextPage = () => (
  <Page name="Vroom Logistics">
    <Home />
  </Page>
);

export default HomePage;
