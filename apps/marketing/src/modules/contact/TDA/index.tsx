import { TDAHeader } from '@vroom-web/header-components';
import React from 'react';

import ContactLabel from './components/ContactLabel';

const TDA: React.FC = () => {
  return (
    <>
      <TDAHeader />
      <ContactLabel />
      {/* ToDo: TDA Footer */}
    </>
  );
};

export default TDA;
