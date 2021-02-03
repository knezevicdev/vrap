import { NextPage } from 'next';
import React from 'react';

import Page from 'src/components/Page';
import Forgot from 'src/modules/forgot';

const SignInPage: NextPage = () => {
  const head = <title>Forgot Password</title>;

  return (
    <Page name="Forgot Password" head={head} unprotected>
      <Forgot />
    </Page>
  );
};

export default SignInPage;
