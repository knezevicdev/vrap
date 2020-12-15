import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';

import { questionsViewModel } from '../../stories/pages/congrats/ViewModels';
import Questions from './sections/Questions';

const Page = styled.div`
  ${(props) => {
    console.log(props.theme);
    return '';
  }}
  display: flex;
  flex-direction: column;
`;

const CongratsView: React.FC = () => {
  return (
    <Page>
      <Questions {...questionsViewModel} />
    </Page>
  );
};

export default observer(CongratsView);
