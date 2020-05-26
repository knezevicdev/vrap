import { NextPage, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import React from 'react';

import experimentSDK from 'src/integrations/experimentSDK';
import Example from 'src/modules/example';
import Page from 'src/Page';

interface Experiment {
  assignedVariant: 0 | 1;
  optimizeId?: string;
}

interface Props {
  description: string;
  experiments: Experiment[];
  title: string;
}

const ExamplePage: NextPage<Props> = ({ description, experiments, title }) => {
  const head = (
    <>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </>
  );

  return (
    <Page experiments={experiments} name="Home" head={head}>
      <Example />
    </Page>
  );
};

ExamplePage.getInitialProps = async (ctx: NextPageContext): Promise<Props> => {
  const title = 'Vroom: Buy, Sell or Trade-In Used Vehicles Online';
  const description =
    'Buy, sell or trade-in a certified used car online from anywhere in the USA. We offer no-haggle car buying, top quality cars, full warranties & home shipping.';
  const cookies = parseCookies(ctx);
  const marketingId = cookies['uuid'];
  const experiments = await experimentSDK.getRunningExperiments(
    marketingId,
    'website'
  );
  return { description, experiments, title };
};

export default ExamplePage;
