import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import React from 'react';

import ContactLabel from './components/ContactLabel';

const { publicRuntimeConfig } = getConfig();

const Vroom: React.FC = () => {
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <>
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <ContactLabel />
      <StandardFooter />
    </>
  );
};

export default Vroom;
