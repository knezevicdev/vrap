import CircularProgress from '@material-ui/core/CircularProgress';
import { styled } from '@material-ui/core/styles';
import { StandardFooter } from '@vroom-web/footer-components';
import { SimpleHeader } from '@vroom-web/header-components';
import { Container } from '@vroom-web/ui';
import getConfig from 'next/config';
import Head from 'next/head';
import { stringify } from 'qs';
import React, { useContext, useEffect, useState } from 'react';

import { QueryContext } from 'src/modules/schedule/QueryContext';

const { publicRuntimeConfig } = getConfig();

const StyledContainer = styled(Container)(() => ({
  flexGrow: 1,
}));

// The widget takes a while to load but I have no event hook to hide a loader.
// So I just always have a loader, but it gets hidden behind the widget.
const HackyCircularProgress = styled(CircularProgress)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
}));

const Vroom: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const query = useContext(QueryContext);

  const { CALENDLY_URL } = publicRuntimeConfig;
  if (!CALENDLY_URL) {
    return null;
  }

  // Tech debt. This is old logic from vroom-com.
  // TODO: simplify this if we want to invest more time in this area of functionality.
  const data = Object.assign({}, query);
  if (Object.keys(data).indexOf('phone') > -1) {
    data.phone = '+1 ' + data.phone;
  }
  const cleaned: { [key: string]: string } = {};
  const keyMapper: { [key: string]: string } = {
    firstName: 'first_name',
    lastName: 'last_name',
    phone: 'a1',
    phoneNumber: 'a1',
  };
  for (const [key, value] of Object.entries(data)) {
    if (typeof value !== 'string') {
      continue;
    }
    const cleanedKey = keyMapper[key] || key;
    cleaned[cleanedKey] = value;
  }
  const queryString = stringify(cleaned, { addQueryPrefix: true });
  const dataUrl = `${CALENDLY_URL}${queryString}`;
  const gearboxPrivateUrl = publicRuntimeConfig.GEARBOX_PRIVATE_URL;

  return (
    <>
      {mounted && (
        <Head>
          <script
            type="text/javascript"
            src="https://assets.calendly.com/assets/external/widget.js"
          />
        </Head>
      )}
      <SimpleHeader gearboxPrivateUrl={gearboxPrivateUrl} />
      <StyledContainer>
        <HackyCircularProgress />
        <div
          className="calendly-inline-widget"
          data-url={dataUrl}
          style={{
            minWidth: '320px',
            height: '1000px',
          }}
        />
      </StyledContainer>
      <StandardFooter />
    </>
  );
};

export default Vroom;
