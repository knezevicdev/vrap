import { NextPage } from 'next';
import React from 'react';

import Home from 'src/modules/Home';
import Page from 'src/Page';

const HomePage: NextPage = () => (
  <Page name="Vroom Logistics">
    <Home />
  </Page>
);

export default HomePage;
