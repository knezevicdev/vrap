import React, { createContext } from 'react';

import UsersModel from './Model';
import View from './View';

export const UsersContext = createContext<UsersModel>(new UsersModel());

// TODO: Make table and filters siblings
const Users: React.FC = () => <View />;

export default Users;
