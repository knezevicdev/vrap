import { TDAFooter } from '@vroom-web/footer-components';
import { TDAHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import ContactLabel from './components/ContactLabel';

const {
  publicRuntimeConfig: { VROOM_URL },
} = getConfig();

const TDA: React.FC = () => {
  return (
    <>
      <TDAHeader vroomUrl={VROOM_URL} />
      <ContactLabel />
      <TDAFooter vroomUrl={VROOM_URL} />
    </>
  );
};

export default TDA;
