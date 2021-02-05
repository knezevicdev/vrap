import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

interface Props {
  title: string;
}

const TestPage: NextPage<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      TestPage Page
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: 'TestPage | Vroom',
    },
  };
};

export default TestPage;
