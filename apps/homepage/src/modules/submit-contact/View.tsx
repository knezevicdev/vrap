import Box from '@material-ui/core/Box';
import { observer } from 'mobx-react';
import React from 'react';

import ErrorBanner from './components/ErrorBanner';
import ContentErrorView from './ContentErrorView';
import ContentLoadingView from './ContentLoadingView';
import ContentView from './ContentView';
import ViewModel from './ViewModel';

import PoweredByFooter from 'src/components/footer/PoweredByFooter';
import PoweredByHeader from 'src/components/header/PoweredByHeader';
import Container from 'src/ui/Container';

interface Props {
  viewModel: ViewModel;
}

const SubmitContactView: React.FC<Props> = ({ viewModel }) => {
  React.useEffect(() => {
    viewModel.startReactions();
    return (): void => {
      viewModel.stopReactions();
    };
  }, [viewModel]);

  const contentViewForState = (): JSX.Element => {
    if (viewModel.loading()) {
      return <ContentLoadingView />;
    } else if (viewModel.error()) {
      return <ContentErrorView viewModel={viewModel} />;
    } else {
      return <ContentView viewModel={viewModel} />;
    }
  };

  return (
    <>
      <PoweredByHeader />
      {viewModel.showErrorBanner() && <ErrorBanner />}
      <Box bgcolor="grey.100">
        <Container content>
          <Box pt={{ xs: 6, md: 4 }} pb={{ xs: 8, md: 20 }}>
            {contentViewForState()}
          </Box>
        </Container>
      </Box>
      <PoweredByFooter />
    </>
  );
};

export default observer(SubmitContactView);
