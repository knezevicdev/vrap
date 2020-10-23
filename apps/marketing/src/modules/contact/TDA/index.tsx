import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import React from 'react';

import ContactLabel from './components/ContactLabel';

const TDA: React.FC = () => {
  return (
    <>
      <TDAHeader />
      <ContactLabel />
      <TDAFooter />
    </>
  );
};

export default TDA;
