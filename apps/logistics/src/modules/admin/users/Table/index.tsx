import React from 'react';

import { UsersContext } from '../index';
import UsersModel from '../Model';
import View from './View';
import ViewModel from './ViewModel';

// TODO: Make table and filters siblings
const Users: React.FC = () => (
  <UsersContext.Consumer>
    {(model: UsersModel): JSX.Element => {
      const viewModel = new ViewModel(model);
      return <View viewModel={viewModel} />;
    }}
  </UsersContext.Consumer>
);

export default Users;
