import { NextPage } from 'next';
import React from 'react';

import Users from 'src/modules/admin/users';
import Page from 'src/Page';

const HomePage: NextPage = () => {
  const head = (
    <>
      <title>Admin - Users</title>
      <meta name="description" content="Carrier Portal"></meta>
    </>
  );

  return (
    <Page name="Admin - Users" head={head}>
      <Users />
    </Page>
  );
};

export default HomePage;
