import React from 'react';

interface Props {
  staticAssetsHostUrl: string;
}

const TDAFontsSnippet: React.FC<Props> = ({ staticAssetsHostUrl }) => {
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
              font-family: 'RingsideCompressed';
              src: url('${staticAssetsHostUrl}/tda/fonts/RingsideCompressed-Bold.woff2') format('woff2');
            }
            @font-face {
              font-family: Calibre;
              font-weight: 400;
              src: url('${staticAssetsHostUrl}/tda/fonts/Calibre-Regular.woff') format('woff');
            }
            @font-face {
              font-family: Calibre;
              font-weight: 500;
              src: url('${staticAssetsHostUrl}/tda/fonts/Calibre-Medium.woff') format('woff');
            }
            @font-face {
              font-family: 'Calibre';
              font-weight: 600;
              src: url('${staticAssetsHostUrl}/tda/fonts/Calibre-Semibold.woff') format('woff');
            }
            @font-face {
              font-family: 'Calibre';
              font-weight: 700;
              src: url('${staticAssetsHostUrl}/tda/fonts/Calibre-Bold.woff') format('woff');
            }
          `,
        }}
      />
    </>
  );
};

export default TDAFontsSnippet;
