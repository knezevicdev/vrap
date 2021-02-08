import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
interface Props {
  title: string;
}

const Registration: NextPage<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      Registration Page
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: 'Registration | Vroom',
    },
  };
};

export default Registration;
