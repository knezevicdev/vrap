import Head from 'next/head';
import { styled } from '@material-ui/core/styles';

import React from 'react';

import Container from 'src/ui/Container';

const Contents = styled('div')(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

interface PageProps {
  category?: string;
  head?: React.ReactNode;
  name: string;
}

class Page extends React.Component<PageProps> {
  // private analyticsHandler: AnalyticsHandler;

  constructor(props: PageProps) {
    super(props);
    // this.analyticsHandler = new AnalyticsHandler();
  }

  componentDidMount(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    // const { category, name } = this.props;
    // this.analyticsHandler.page(name, category);
  }

  render(): React.ReactNode {
    const { children, head } = this.props;
    return (
      <>
        {head && <Head>{head}</Head>}
        <Container disableGutters maxWidth="xl">
          <Contents>{children}</Contents>
        </Container>
      </>
    );
  }
}

export default Page;
