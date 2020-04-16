import { NextPage } from 'next';
import React from 'react';

import Page from 'src/components/Page';
import SubmitContact from 'src/modules/submit-contact';
import {
  getInitialSubmitContactStoreState,
  InitialSubmitContactStoreState,
  SubmitContactStore,
  SubmitContactStoreContext,
} from 'src/modules/submit-contact/store';

interface Props {
  initialStoreState: InitialSubmitContactStoreState;
  title: string;
}

const SubmitContactPage: NextPage<Props> = ({ initialStoreState, title }) => {
  const store = new SubmitContactStore(initialStoreState);
  const head = (
    <>
      <title>{title}</title>
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
  return (
    <Page name="Submit Contact" head={head}>
      <SubmitContactStoreContext.Provider value={store}>
        <SubmitContact />
      </SubmitContactStoreContext.Provider>
    </Page>
  );
};

SubmitContactPage.getInitialProps = async ({ query }): Promise<Props> => {
  const slug = query.slug as string;
  const slugArray = slug.split('-');
  const vin = slugArray[slugArray.length - 1];
  const initialStoreState = await getInitialSubmitContactStoreState(vin);
  let title;
  if (initialStoreState.vehicle._source) {
    title = 'Submit Contact - Rocket Auto';
  } else {
    title = 'Car Not Available - Rocket Auto';
  }
  return {
    initialStoreState,
    title,
  };
};

export default SubmitContactPage;
