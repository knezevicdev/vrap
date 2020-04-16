import React from 'react';

import globalEnv from 'src/globalEnv';

const FaviconSnippet: React.FC = () => {
  return (
    <>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${globalEnv.CDN_URL}/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${globalEnv.CDN_URL}/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${globalEnv.CDN_URL}/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${globalEnv.CDN_URL}/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${globalEnv.CDN_URL}/safari-pinned-tab.svg`}
        color="#c9072a"
      />
      <meta name="msapplication-TileColor" content="#da532c" />
    </>
  );
};

export default FaviconSnippet;
