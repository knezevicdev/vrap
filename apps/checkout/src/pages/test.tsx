import { ClientImpl } from '@vroom-web/networking';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

interface Props {
  stuff: any;
}

const TestPage: NextPage<Props> = ({ stuff }) => {
  console.log('stuff', stuff);

  const [clientImpl] = React.useState(
    new ClientImpl({
      endpoint: 'https://gearbox-dev-int.vroomapi.com/query-public',
    })
  );
  React.useEffect(() => {
    const doIt = async (): Promise<void> => {
      const res = await clientImpl.gqlRequest({
        document: `query { version }`,
      });
      console.log('res', res);
    };
    doIt();
  }, [clientImpl]);
  return null;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ctx: GetServerSidePropsContext
) => {
  const clientImpl = new ClientImpl({
    endpoint: 'https://gearbox-dev-int.vroomapi.com/query-public',
  });
  const res = await clientImpl.gqlRequest({
    document: `query { version }`,
  });
  return {
    props: {
      stuff: JSON.stringify(res),
    },
  };
};

export default TestPage;
