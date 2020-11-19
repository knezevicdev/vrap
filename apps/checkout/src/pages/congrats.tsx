import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import Congrats from 'src/modules/congrats';

interface Props {
  title: string;
}

const CongratsPage: NextPage<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Congrats />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: 'Congrats | Vroom',
    },
  };
};

export default CongratsPage;
