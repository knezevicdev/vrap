import { NextPage } from 'next';
import React from 'react';

import Page from 'src/components/Page';
import Signup, { SignupContext } from 'src/modules/signup';
import SignupModel from 'src/modules/signup/Model';

const SignupPage: NextPage = () => {
  const model = new SignupModel();
  return (
    <Page name="Sign Up" unprotected>
      <SignupContext.Provider value={model}>
        <Signup />
      </SignupContext.Provider>
    </Page>
  );
};

export default SignupPage;
