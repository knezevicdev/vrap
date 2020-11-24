import { observer } from 'mobx-react';
import React from 'react';

import ViewModel from './ViewModel';
import styled from 'styled-components';

export interface Props {
  viewModel: ViewModel;
}

const Iframe = styled.iframe`
  margin: 0;
  padding: 0;
  border: none;
  height: 60vh;
  width: 50vw;
  @media (max-width: 840px) {
    width: 100%;
  }
`;

const Photo: React.FC<Props> = ({ viewModel }) => {
  const spinCarUrl = viewModel.getSpinCarUrl();
  return <>{spinCarUrl && <Iframe src={spinCarUrl}></Iframe>}</>;
};

export default observer(Photo);
