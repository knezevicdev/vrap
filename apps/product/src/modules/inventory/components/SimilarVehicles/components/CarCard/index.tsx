import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import DesktopView from './DesktopView';
import MobileView from './MobileView';
import CarCardViewModel from './ViewModel';

import { Car } from 'src/networking/models/Inventory.v3';

interface CarCardProps {
  car: Car | undefined;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const viewModel = new CarCardViewModel(car);
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  return xsDown ? (
    <MobileView viewModel={viewModel} />
  ) : (
    <DesktopView viewModel={viewModel} />
  );
};

export default CarCard;
