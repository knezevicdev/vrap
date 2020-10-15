import { styled } from '@material-ui/core/styles';
import { Brand, Container } from '@vroom-web/ui';
import Head from 'next/head';
import React from 'react';

import { analyticsHandler } from 'src/integrations/AnalyticsHandler';

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
  brand: Brand;
}

class Page extends React.Component<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  componentDidMount(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const { category, experiments, name } = this.props;

    if (experiments) {
      analyticsHandler.setExperiments(experiments);
    }
    analyticsHandler.page(name, category);
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
