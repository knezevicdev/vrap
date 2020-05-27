import { Container, Typography } from '@vroom-web/ui';
import React from 'react';

import ViewModel from './ViewModel';

interface Props {
  viewModel: ViewModel;
}
const ExampleView: React.FC<Props> = ({ viewModel }) => {
  return (
    <Container>
      <Typography variant="body1" fontWeight="fontWeightLight">
        {viewModel.welcome}
      </Typography>
    </Container>
  );
};

export default ExampleView;
