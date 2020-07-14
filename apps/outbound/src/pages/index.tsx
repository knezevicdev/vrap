import { NextPage, NextPageContext } from 'next';
import React from 'react';

interface Props {
  description: string;
}

const HomePage: NextPage<Props> = ({ description }) => {
  return <div>{description}</div>;
};

HomePage.getInitialProps = (ctx: NextPageContext): Props => {
  return {
    description: 'Hello World',
  };
};

export default HomePage;
