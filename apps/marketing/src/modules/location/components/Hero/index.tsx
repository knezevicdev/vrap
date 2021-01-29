import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface HeroProps {
  imgUrl: string;
  locationTitle: string;
  googleMapsUrl: string;
  closed: boolean;
}
const Hero: React.FC<HeroProps> = ({
  locationTitle,
  imgUrl,
  googleMapsUrl,
  closed,
}) => {
  const viewModel = new ViewModel(locationTitle, imgUrl, googleMapsUrl, closed);
  return <View viewModel={viewModel} />;
};

export default Hero;
