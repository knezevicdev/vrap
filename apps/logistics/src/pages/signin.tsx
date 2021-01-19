import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import React from 'react';

import Page from 'src/components/Page';
import SignIn, { SignInContext } from 'src/modules/signin';
import SignInModel from 'src/modules/signin/Model';

const SignInPage: NextPage = () => {
  const router = useRouter();
  const previous = (router.query.previous as string) || '/';
  const model = new SignInModel(previous);
  const head = <title>Sign In</title>;

  return (
    <Page name="Sign In" head={head} unprotected>
      <SignInContext.Provider value={model}>
        <SignIn />
      </SignInContext.Provider>
    </Page>
  );
};

export default SignInPage;
