import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React from 'react';

const { publicRuntimeConfig: GEARBOX_PRIVATE_URL } = getConfig();

const Vroom: React.FC = () => {
  const { query } = useRouter();
  const path = query.path || 'welcome';
  return (
    <>
      <SimpleHeader gearboxPrivateUrl={GEARBOX_PRIVATE_URL} />
      <iframe
        src={`https://vroom-web.force.com/support/s/${path}`}
        style={{
          height: '100vh',
        }}
        sandbox="allow-same-origin allow-scripts"
      />
      <StandardFooter />
    </>
  );
};

export default Vroom;
