import { SimpleHeader } from '@vroom-web/header-components';
import { observer } from 'mobx-react-lite';
import getConfig from 'next/config';
import React from 'react';
import styled from 'styled-components';

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

const {
  publicRuntimeConfig: { GEARBOX_PRIVATE_URL },
} = getConfig();

const CongratsView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Page>
      <SimpleHeader gearboxPrivateUrl={GEARBOX_PRIVATE_URL} />
    </Page>
  );
};

export default observer(CongratsView);
