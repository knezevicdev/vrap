import { NextPage } from 'next';
import React from 'react';

import Users from 'src/modules/admin/users';
import Page from 'src/Page';

const HomePage: NextPage = () => (
  <Page name="Admin - Users" description="Carrier Portal">
    <Users />
  </Page>
);

export default HomePage;
