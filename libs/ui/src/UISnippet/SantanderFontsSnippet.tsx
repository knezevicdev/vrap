// TODO: update this to the actual Santander fonts

import React from 'react';

interface Props {
  hostUrl: string;
}

const SantanderFontsSnippet: React.FC<Props> = ({ hostUrl }) => {
  return (
    <>
      {/*
        Font Icons
        In order to use the font Icon component
      */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'SantanderHeadline';
              src: url('${hostUrl}/fonts/SantanderHeadline-Regular.ttf') format('truetype');
            }
            @font-face {
              font-family: 'SantanderHeadline';
              font-weight: 700
              src: url('${hostUrl}/fonts/SantanderHeadline-Bold.ttf') format('truetype');
            }
            @font-face {
              font-family: 'SantanderText';
              src: url('${hostUrl}/fonts/SantanderText-Regular.ttf') format('truetype');
            }
            @font-face {
              font-family: 'SantanderText';
              font-weight: 700
              src: url('${hostUrl}/fonts/SantanderText-Bold.ttf') format('truetype');
            }
          `,
        }}
      />
    </>
  );
};

export default SantanderFontsSnippet;
