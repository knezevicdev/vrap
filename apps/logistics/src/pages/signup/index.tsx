import { NextPage } from 'next';
import React from 'react';

import Signup, { SignupContext } from 'src/modules/signup';
import SignupModel from 'src/modules/signup/Model';
import Page from 'src/Page';

const SignupPage: NextPage = () => {
  const model = new SignupModel();
  return (
    <Page name="Sign Up" description="Carrier Portal">
      <SignupContext.Provider value={model}>
        <Signup />
      </SignupContext.Provider>
    </Page>
  );
};

export default SignupPage;
