import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link'
import Head from 'next/head';
import React from 'react';
import Router from "next/router";
import get from "lodash/get";

interface Props {
  title: string;
}

const stepNavigator = (to: string) => {
  const {router} = Router;
  const vin = get(router, 'query.vin');
  Router.push(`/${vin}/${to}`)
}

const CheckoutTradeIn: NextPage<Props> = ({ title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      This is the CheckoutTradeIn page test
      <p>
      <button onClick={()=> stepNavigator("registration")}>Next</button>
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
