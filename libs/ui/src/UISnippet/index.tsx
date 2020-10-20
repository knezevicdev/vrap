import React from 'react';

import { Brand } from '../types';
import { getThemeForBrand } from '../util';
import SantanderFaviconSnippet from './SantanderFaviconSnippet';
import SantanderFontsSnippet from './SantanderFontsSnippet';
import TDAFaviconSnippet from './TDAFaviconSnippet';
import TDAFontsSnippet from './TDAFontsSnippet';
import VroomFaviconSnippet from './VroomFaviconSnippet';
import VroomFontsSnippet from './VroomFontsSnippet';

interface Props {
  brand?: Brand;
  staticAssetsHostUrl: string;
}

const UISnippet: React.FC<Props> = ({
  brand = Brand.VROOM,
  staticAssetsHostUrl,
}) => {
  const theme = getThemeForBrand(brand);
  if (brand === Brand.SANTANDER) {
    return (
      <>
        <SantanderFaviconSnippet
          staticAssetsHostUrl={staticAssetsHostUrl}
          theme={theme}
        />
        <SantanderFontsSnippet staticAssetsHostUrl={staticAssetsHostUrl} />
      </>
    );
  } else if (brand === Brand.TDA) {
    return (
      <>
        <TDAFaviconSnippet
          staticAssetsHostUrl={staticAssetsHostUrl}
          theme={theme}
        />
        <TDAFontsSnippet staticAssetsHostUrl={staticAssetsHostUrl} />
      </>
    );
  }
  return (
    <>
      <VroomFaviconSnippet
        staticAssetsHostUrl={staticAssetsHostUrl}
        theme={theme}
      />
      <VroomFontsSnippet staticAssetsHostUrl={staticAssetsHostUrl} />
    </>
  );
};

export default UISnippet;
