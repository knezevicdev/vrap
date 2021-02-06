import get from 'lodash/get';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';

interface Props {
  title: string;
}

const stepNavigator = (to: string): void => {
  const { router } = Router;
  const vin = get(router, 'query.vin');
  Router.push(`/${vin}/${to}`);
};

const CheckoutTradeIn: NextPage<Props> = ({ title }): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      This is the CheckoutTradeIn page test
      <p>
        <button onClick={(): void => stepNavigator('registration')}>
          Next
        </button>
      </p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  return {
    props: {
      title: 'TradeIn | Vroom',
    },
  };
};

export default CheckoutTradeIn;
