import getConfig from 'next/config';
import React from 'react';

const { ASSET_PREFIX } = getConfig().publicRuntimeConfig;

const FontsSnippet: React.FC = () => {
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
              src: url('${ASSET_PREFIX}/fonts/VroomSansSMALL-ExtraBoldItalicWEB.woff') format('woff');
            }
            @font-face {
              font-family: Calibre;
              font-weight: 400;
              src: url('${ASSET_PREFIX}/fonts/CalibreWeb-Regular.woff') format('woff');
            }
            @font-face {
              font-family: 'Calibre';
              font-weight: 600;
              src: url('${ASSET_PREFIX}/fonts/CalibreWeb-Semibold.woff') format('woff');
            }
          `,
        }}
      />
    </>
  );
};

export default FontsSnippet;
