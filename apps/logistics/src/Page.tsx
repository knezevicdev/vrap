import { styled } from '@material-ui/core/styles';
import { Container } from '@vroom-web/ui';
import Head from 'next/head';
import React from 'react';

import Header from './components/Header';

const Contents = styled('div')(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

interface Experiment {
  id: string;
  assignedVariant: 0 | 1;
  optimizeId?: string;
}

interface Props {
  description?: string;
  category?: string;
  experiments?: Experiment[];
  name: string;
}

const Page: React.FC<Props> = ({ name, children }) => (
  <>
    <Head>
      <title>{name}</title>
    </Head>
    <Header />
    <Container disableDefaultPadding maxWidth="xl">
      <Contents>{children}</Contents>
    </Container>
  </>
);

export default Page;
