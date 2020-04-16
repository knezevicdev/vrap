import React from 'react';

import globalEnv from 'src/globalEnv';

const FontsSnippet: React.FC = () => {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @font-face {
            font-family: 'RocketSans';
            font-weight: 700;
            src: url('${globalEnv.CDN_URL}/fonts/RocketSans-Bold.woff') format('woff');
          }
          @font-face {
            font-family: 'RocketSans';
            font-weight: 700;
            font-style: italic;
            src: url('${globalEnv.CDN_URL}/fonts/RocketSans-BoldItalic.woff') format('woff');
          }
          @font-face {
            font-family: 'RocketSans';
            font-weight: 500;
            src: url('${globalEnv.CDN_URL}/fonts/RocketSans-Medium.woff') format('woff');
          }
          @font-face {
            font-family: 'RocketSans';
            font-weight: 500;
            font-style: italic;
            src: url('${globalEnv.CDN_URL}/fonts/RocketSans-MediumItalic.woff') format('woff');
          }
          @font-face {
            font-family: 'RocketSans';
            font-weight: 400;
            src: url('${globalEnv.CDN_URL}/fonts/RocketSans-Regular.woff') format('woff');
          }
          @font-face {
            font-family: 'RocketSans';
            font-weight: 400;
            font-style: italic;
            src: url('${globalEnv.CDN_URL}/fonts/RocketSans-RegularItalic.woff') format('woff');
          }
          @font-face {
            font-family: 'RocketSans';
            font-weight: 300;
            src: url('${globalEnv.CDN_URL}/fonts/RocketSans-Light.woff') format('woff');
          }
          @font-face {
            font-family: 'RocketSans';
            font-weight: 300;
            font-style: italic;
            src: url('${globalEnv.CDN_URL}/fonts/RocketSans-LightItalic.woff') format('woff');
          }
        `,
      }}
    />
  );
};

export default FontsSnippet;
