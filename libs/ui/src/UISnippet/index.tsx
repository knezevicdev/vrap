import React from 'react';

import { Brand } from '../types';
import { getThemeForBrand } from '../util';
import SantanderFontsSnippet from './SantanderFontsSnippet';
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
    // TODO: add Santander favicon snippet.
    return <SantanderFontsSnippet staticAssetsHostUrl={staticAssetsHostUrl} />;
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
