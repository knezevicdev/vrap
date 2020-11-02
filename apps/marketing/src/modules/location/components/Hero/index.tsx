import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface HeroProps {
  imgUrl: string;
  locationTitle: string;
  googleMapsUrl: string;
}
const Hero: React.FC<HeroProps> = ({
  locationTitle,
  imgUrl,
  googleMapsUrl,
}) => {
  const viewModel = new ViewModel(locationTitle, imgUrl, googleMapsUrl);
  return <View viewModel={viewModel} />;
};

export default Hero;
