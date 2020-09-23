import { styled } from '@material-ui/core/styles';
import { Container } from '@vroom-web/ui';
import Head from 'next/head';
import React from 'react';

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

interface PageProps {
  category?: string;
  experiments?: Experiment[];
  head?: React.ReactNode;
  name: string;
}

class Page extends React.Component<PageProps> {
  render(): React.ReactNode {
    const { children, head } = this.props;
    return (
      <>
        {head && <Head>{head}</Head>}
        <Container disableDefaultPadding maxWidth="xl">
          <Contents>{children}</Contents>
        </Container>
      </>
    );
  }
}

export default Page;
