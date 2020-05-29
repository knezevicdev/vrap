import { styled } from '@material-ui/core/styles';
import { Container } from '@vroom-web/ui';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import React from 'react';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

const Contents = styled('div')(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
}));

interface Experiment {
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
  private analyticsHandler: AnalyticsHandler;

  constructor(props: PageProps) {
    super(props);
    this.analyticsHandler = new AnalyticsHandler();
  }

  componentDidMount(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    const { category, experiments, name } = this.props;
    const cookies = parseCookies();
    const anonymousId: string | undefined = cookies['uuid'];
    if (anonymousId) {
      this.analyticsHandler.setAnonymousId(anonymousId);
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
