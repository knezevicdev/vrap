import React, { createContext } from 'react';

// import UsersModel from './Model';
import View from './View';
// import ViewModel from './ViewModel';

// export const UsersContext = createContext<UsersModel>(new UsersModel());

const SignIn: React.FC = () => {
  return <View />;
  // return (
  //   <UsersContext.Consumer>
  //     {(model: UsersModel): JSX.Element => {
  //       const viewModel = new ViewModel(model);
  //       return <View viewModel={viewModel} />;
  //     }}
  //   </UsersContext.Consumer>
  // );
};

export default SignIn;
