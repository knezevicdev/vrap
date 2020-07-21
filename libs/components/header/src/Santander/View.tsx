import { styled } from '@material-ui/core/styles';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}

const ViewContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  background: '#F1F1F1',
}));

const View: React.FC<Props> = ({ viewModel }) => {
  return (
    <ViewContainer>
      hello
    </ViewContainer>
  );
};

export default View;
