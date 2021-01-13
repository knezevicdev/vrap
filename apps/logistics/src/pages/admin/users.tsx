import { NextPage } from 'next';
import React from 'react';

import Page from 'src/components/Page';
import Users, { UsersContext } from 'src/modules/admin/users';
import UsersModel from 'src/modules/admin/users/Model';

const UsersPage: NextPage = () => {
  const model = new UsersModel();
  const head = <title>Admin - Users</title>;

  return (
    <Page name="User Management" head={head}>
      <UsersContext.Provider value={model}>
        <Users />
      </UsersContext.Provider>
    </Page>
  );
};

export default UsersPage;
