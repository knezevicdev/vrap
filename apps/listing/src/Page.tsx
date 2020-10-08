import { styled } from '@material-ui/core/styles';
import { Brand, Container } from '@vroom-web/ui';
import Head from 'next/head';
import React from 'react';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

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
  private analyticsHandler: AnalyticsHandler;

  constructor(props: PageProps) {
    super(props);
    this.analyticsHandler = new AnalyticsHandler();
  }

  componentDidMount(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const { category, experiments, name } = this.props;
    if (this.props.brand === Brand.SANTANDER) {
      this.analyticsHandler.createAdditionalTracker(
        'UA-2348754-1',
        'santander'
      );
    }
    if (experiments) {
      this.analyticsHandler.setExperiments(experiments);
    }
    this.analyticsHandler.page(name, category);
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
