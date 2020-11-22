import React, { createContext } from 'react';

import UsersModel from './Model';
import View from './View';
import ViewModel from './ViewModel';

export const UsersContext = createContext<UsersModel>(new UsersModel());

// TODO create context so that autocomplete can interact with model
const Users: React.FC = () => (
  <UsersContext.Consumer>
    {(model: UsersModel): JSX.Element => {
      const viewModel = new ViewModel(model);
      return <View viewModel={viewModel} />;
    }}
  </UsersContext.Consumer>
);

export default Users;
