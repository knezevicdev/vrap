import { ClientImpl } from '@vroom-web/networking';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';

interface Props {
  dataFromServerSideRequest: any;
}

const TestPage: NextPage<Props> = ({ dataFromServerSideRequest }) => {
  console.log('dataFromServerSideRequest', dataFromServerSideRequest);

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
      console.log('dataFromClientSideRequest', res);
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
      dataFromServerSideRequest: JSON.stringify(res),
    },
  };
};

export default TestPage;
