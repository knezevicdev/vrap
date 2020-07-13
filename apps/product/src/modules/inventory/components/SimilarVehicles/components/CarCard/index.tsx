import { Car } from '@vroom-web/inv-search-networking';
import React from 'react';

import View from './View';
import ViewModel from './ViewModel';

interface CarCardProps {
  car: Car | undefined;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const viewModel = new ViewModel(car);
  return <View viewModel={viewModel} />
};

export default CarCard;
