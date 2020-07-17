import { NextPage } from 'next';
import React from 'react';

import Home from 'src/modules/home';
import Page from 'src/Page';

interface Props {
  description: string;
  title: string;
}

const HomePage: NextPage<Props> = ({ description, title }) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <Page name="Home" head={head}>
      <Home />
    </Page>
  );
};

HomePage.getInitialProps = async (): Promise<Props> => {
  const title = 'Vroom Fulfillment';
  const description = '';

  return { description, title };
};

export default HomePage;
