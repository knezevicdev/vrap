import React from 'react';

import { Brand } from '../types';
import { getThemeForBrand } from '../util';
import SantanderFaviconSnippet from './SantanderFaviconSnippet';
import SantanderFontsSnippet from './SantanderFontsSnippet';
import VroomFaviconSnippet from './VroomFaviconSnippet';
import VroomFontsSnippet from './VroomFontsSnippet';

interface Props {
  brand?: Brand;
  hostUrl: string;
}

const UISnippet: React.FC<Props> = ({ brand = Brand.VROOM, hostUrl }) => {
  const theme = getThemeForBrand(brand);
  if (brand === Brand.SANTANDER) {
    return (
      <>
        <SantanderFaviconSnippet hostUrl={hostUrl} theme={theme} />
        <SantanderFontsSnippet hostUrl={hostUrl} />
      </>
    );
  }
  return (
    <>
      <VroomFaviconSnippet hostUrl={hostUrl} theme={theme} />
      <VroomFontsSnippet hostUrl={hostUrl} />
    </>
  );
};

export default UISnippet;
