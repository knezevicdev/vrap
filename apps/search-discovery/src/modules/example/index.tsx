import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import React from 'react';

import Example from './View';
import ViewModel from './ViewModel';

const Home: React.FC = () => {
  const viewModel = new ViewModel();
  return (
    <>
      <SimpleHeader />
      <Example viewModel={viewModel} />
      <StandardFooter />
    </>
  );
};

export default Home;
