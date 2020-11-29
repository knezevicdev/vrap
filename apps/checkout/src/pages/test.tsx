import { Client } from '@vroom-web/networking';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

interface Props {
  stuff: any;
}

const TestPage: NextPage<Props> = ({ stuff }) => {
  console.log('stuff', stuff);

  const [client] = React.useState(
    new Client('https://gearbox-dev-int.vroomapi.com/query-private')
  );
  React.useEffect(() => {
    const doIt = async (): Promise<void> => {
      const res = await client.gqlRequest({
        document: `query { version }`,
      });
      console.log('res', res);
    };
    doIt();
  }, [client]);
  return null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ctx: GetServerSidePropsContext
) => {
  const client = new Client(
    'https://gearbox-dev-int.vroomapi.com/query-private'
  );
  const res = await client.gqlRequest({
    document: `query { version }`,
  });
  return {
    props: {
      stuff: JSON.stringify(res),
    },
  };
};

export default TestPage;
