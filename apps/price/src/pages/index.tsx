import { NextPage } from 'next';
import React from 'react';
import Link from '@material-ui/core/Link';
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
      Hello world
      <Link href="page1">
        <a>Foo</a>
      </Link>
    </Page>
  );
};

HomePage.getInitialProps = async (): Promise<Props> => {
  const title = 'Vroom SUYC';
  const description = '';

  return { description, title };
};

export default HomePage;
