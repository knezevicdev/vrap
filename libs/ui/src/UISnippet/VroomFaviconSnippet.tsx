import React from 'react';

import { Theme } from '../types';

interface Props {
  hostUrl: string;
  theme: Theme;
}

const VroomFaviconSnippet: React.FC<Props> = ({ hostUrl, theme }) => {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${hostUrl}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${hostUrl}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${hostUrl}/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${hostUrl}/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${hostUrl}/safari-pinned-tab.svg`}
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

export default VroomFaviconSnippet;
