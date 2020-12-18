import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import Congratulations from 'src/modules/congratulations';

interface Props {
  title: string;
}

const CongratulationsPage: NextPage<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Congratulations />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: 'Congratulations | Vroom',
    },
  };
};

export default CongratulationsPage;
