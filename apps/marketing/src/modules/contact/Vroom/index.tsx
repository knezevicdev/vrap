import React from 'react';
import getConfig from 'next/config';
import ContactLabel from './components/ContactLabel';
import styled from 'styled-components';

import { SimpleHeader } from '@vroom-web/header-components';
import { StandardFooter } from '@vroom-web/footer-components';

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
