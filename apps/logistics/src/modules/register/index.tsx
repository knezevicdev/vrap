import React, { createContext } from 'react';

import RegisterModel from './Model';
import View from './View';
import ViewModel from './ViewModel';

export const RegisterContext = createContext<RegisterModel>(
  new RegisterModel()
);

const Register: React.FC = () => {
  return (
    <RegisterContext.Consumer>
      {(model: RegisterModel): JSX.Element => {
        const viewModel = new ViewModel(model);
        return <View viewModel={viewModel} />;
      }}
    </RegisterContext.Consumer>
  );
};

export default Register;
