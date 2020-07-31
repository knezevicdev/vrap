import React from 'react';

interface Props {
  staticAssetsHostUrl: string;
}

const SantanderFontsSnippet: React.FC<Props> = ({ staticAssetsHostUrl }) => {
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
              src: url('${staticAssetsHostUrl}/santander/fonts/SantanderHeadline-Regular.ttf') format('truetype');
            }
            @font-face {
              font-family: 'SantanderHeadline';
              font-weight: 700
              src: url('${staticAssetsHostUrl}/santander/fonts/SantanderHeadline-Bold.ttf') format('truetype');
            }
            @font-face {
              font-family: 'SantanderText';
              src: url('${staticAssetsHostUrl}/santander/fonts/SantanderText-Regular.ttf') format('truetype');
            }
            @font-face {
              font-family: 'SantanderText';
              font-weight: 700
              src: url('${staticAssetsHostUrl}/santander/fonts/SantanderText-Bold.ttf') format('truetype');
            }
          `,
        }}
      />
    </>
  );
};

export default SantanderFontsSnippet;
