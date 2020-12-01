import { NextPage } from 'next';
import React from 'react';

import Users, { UsersContext } from 'src/modules/admin/users';
import UsersModel from 'src/modules/admin/users/Model';
import Page from 'src/Page';

const UsersPage: NextPage = () => {
  const model = new UsersModel();
  return (
    <Page name="Admin - Users" description="Carrier Portal">
      <UsersContext.Provider value={model}>
        <Users />
      </UsersContext.Provider>
    </Page>
  );
};

export default UsersPage;
