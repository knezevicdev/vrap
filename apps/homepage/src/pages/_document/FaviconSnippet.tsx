import { theme } from '@vroom-web/ui';
import React from 'react';

import globalEnv from 'src/globalEnv';

const FaviconSnippet: React.FC = () => {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${globalEnv.PUBLIC_URL}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${globalEnv.PUBLIC_URL}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${globalEnv.PUBLIC_URL}/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${globalEnv.PUBLIC_URL}/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${globalEnv.PUBLIC_URL}/safari-pinned-tab.svg`}
        color={theme.palette.primary.main}
      />
      <meta
        name="msapplication-TileColor"
        content={theme.palette.primary.main}
      />
      <meta name="theme-color" content={theme.palette.primary.main} />
    </>
  );
};

export default FaviconSnippet;
