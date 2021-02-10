import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
interface Props {
  title: string;
}

const DocumentUpload: NextPage<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      DocumentUpload Page
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: 'DocumentUpload | Vroom',
    },
  };
};

export default DocumentUpload;
