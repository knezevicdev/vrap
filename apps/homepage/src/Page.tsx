import { styled } from '@material-ui/core/styles';
import { Container } from '@vroom-web/ui';
import Head from 'next/head';
import React from 'react';

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
        <Container disableDefaultPadding maxWidth="xl">
          <Contents>{children}</Contents>
        </Container>
      </>
    );
  }
}

export default Page;
