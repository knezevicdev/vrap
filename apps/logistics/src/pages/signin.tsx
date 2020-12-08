import { NextPage } from 'next';
import React from 'react';

import SignIn from 'src/modules/signin';
import Page from 'src/Page';

const SignInPage: NextPage = () => {
  return (
    <Page name="Sign-In" description="">
      <SignIn />
    </Page>
  );
};

export default SignInPage;
