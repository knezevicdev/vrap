import React from 'react';

import globalEnv from 'src/globalEnv';

const FontsSnippet: React.FC = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'VroomSans';
            src: url('${globalEnv.CDN_URL}/fonts/VroomSansSMALL-ExtraBoldItalicWEB.woff') format('woff');
          }
          @font-face {
            font-family: Calibre;
            font-weight: 400;
            src: url('${globalEnv.CDN_URL}/fonts/CalibreWeb-Regular.woff') format('woff');
          }
          @font-face {
            font-family: 'Calibre';
            font-weight: 600;
            src: url('${globalEnv.CDN_URL}/fonts/CalibreWeb-Semibold.woff') format('woff');
          }
        `,
      }}
    />
  );
};

export default FontsSnippet;
