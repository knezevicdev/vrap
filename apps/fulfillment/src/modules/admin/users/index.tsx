import React, { createContext } from 'react';

import UsersModel from './Model';
import View from './View';
import ViewModel from './ViewModel';

export const UsersContext = createContext<UsersModel>(new UsersModel());

const Users: React.FC = () => {
  const model = new UsersModel();
  const viewModel = new ViewModel(model);
  return <View viewModel={viewModel} />;
};

export default Users;
