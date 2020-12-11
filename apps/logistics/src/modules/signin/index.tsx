import React, { createContext } from 'react';

import SignInModel from './Model';
import View from './View';
import ViewModel from './ViewModel';

export const SignInContext = createContext<SignInModel>(new SignInModel());

const SignIn: React.FC = () => {
  return (
    <SignInContext.Consumer>
      {(model: SignInModel): JSX.Element => {
        const viewModel = new ViewModel(model);
        return <View viewModel={viewModel} />;
      }}
    </SignInContext.Consumer>
  );
};

export default SignIn;
