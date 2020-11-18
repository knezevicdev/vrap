import { vroomTheme as theme } from '@vroom-web/ui';
import getConfig from 'next/config';
import React from 'react';

const { ASSET_PREFIX } = getConfig().publicRuntimeConfig;
const FaviconSnippet: React.FC = () => {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${ASSET_PREFIX}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${ASSET_PREFIX}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${ASSET_PREFIX}/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${ASSET_PREFIX}/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${ASSET_PREFIX}/safari-pinned-tab.svg`}
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
