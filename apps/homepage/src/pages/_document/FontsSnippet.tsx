import React from 'react';

import globalEnv from 'src/globalEnv';

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
              src: url('${globalEnv.PUBLIC_URL}/fonts/VroomSansSMALL-ExtraBoldItalicWEB.woff') format('woff');
            }
            @font-face {
              font-family: Calibre;
              font-weight: 400;
              src: url('${globalEnv.PUBLIC_URL}/fonts/CalibreWeb-Regular.woff') format('woff');
            }
            @font-face {
              font-family: 'Calibre';
              font-weight: 600;
              src: url('${globalEnv.PUBLIC_URL}/fonts/CalibreWeb-Semibold.woff') format('woff');
            }
          `,
        }}
      />
    </>
  );
};

export default FontsSnippet;
