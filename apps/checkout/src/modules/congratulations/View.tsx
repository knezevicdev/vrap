// import { SimpleHeader } from '@vroom-web/header-components';
import { Footer, ThemeProps } from '@vroom-web/temp-ui-alias-for-checkout';
import { observer } from 'mobx-react-lite';
// import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

import Error from './sections/Error';
import Loading from './sections/Loading';
import Questions from './sections/Questions';
import Success from './sections/Success';
import CongratsViewModel from './ViewModel';

const primaryWhite = (props: { theme: ThemeProps }): string =>
  props.theme.colors.primary.white;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  background: ${primaryWhite};
`;

interface Props {
  viewModel: CongratsViewModel;
}

// const {
//   publicRuntimeConfig: { GEARBOX_PRIVATE_URL },
// } = getConfig();

const CongratsView: React.FC<Props> = ({ viewModel }) => {
  const { sections } = viewModel.footerProps;
  const questionsProps = viewModel.questionsProps;

  return (
    <Page>
      {/* <SimpleHeader gearboxPrivateUrl={GEARBOX_PRIVATE_URL} /> */}
      {viewModel.showLoading && <Loading />}
      {viewModel.showError && <Error />}
      {viewModel.showSuccess && <Success viewModel={viewModel} />}
      <Questions {...questionsProps} />
      <Footer sections={sections} />
    </Page>
  );
};

export default observer(CongratsView);
