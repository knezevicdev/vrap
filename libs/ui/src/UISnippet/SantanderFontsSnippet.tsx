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
              font-family: 'VroomSans';
              src: url('${hostUrl}/fonts/VroomSansSMALL-ExtraBoldItalicWEB.woff') format('woff');
            }
            @font-face {
              font-family: Calibre;
              font-weight: 400;
              src: url('${hostUrl}/fonts/CalibreWeb-Regular.woff') format('woff');
            }
            @font-face {
              font-family: Calibre;
              font-weight: 500;
              src: url('${hostUrl}/fonts/CalibreWeb-Semibold.woff') format('woff');
            }
            @font-face {
              font-family: 'Calibre';
              font-weight: 600;
              src: url('${hostUrl}/fonts/CalibreWeb-Semibold.woff') format('woff');
            }
          `,
        }}
      />
    </>
  );
};

export default SantanderFontsSnippet;
