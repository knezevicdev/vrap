import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import VehicleTradeIn from 'src/modules/vehicleTradeIn';

interface Props {
  title: string;
}

const VehicleTradeInPage: NextPage<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <VehicleTradeIn />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: 'VehicleTradeIn | Vroom',
    },
  };
};

export default VehicleTradeInPage;
