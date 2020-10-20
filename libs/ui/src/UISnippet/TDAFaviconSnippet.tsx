import React from 'react';

import { Theme } from '../types';

interface Props {
  staticAssetsHostUrl: string;
  theme: Theme;
}

const TDAFaviconSnippet: React.FC<Props> = ({ staticAssetsHostUrl, theme }) => {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${staticAssetsHostUrl}/tda/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${staticAssetsHostUrl}/tda/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${staticAssetsHostUrl}/tda/favicons/favicon-16x16.png`}
      />
      <link
        rel="manifest"
        href={`${staticAssetsHostUrl}/tda/favicons/site.webmanifest`}
      />
      <link
        rel="mask-icon"
        href={`${staticAssetsHostUrl}/tda/favicons/safari-pinned-tab.svg`}
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

export default TDAFaviconSnippet;
