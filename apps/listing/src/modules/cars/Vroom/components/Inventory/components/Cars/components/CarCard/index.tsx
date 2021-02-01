import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Car } from '@vroom-web/inv-search-networking';
import React, { useContext } from 'react';

import LoadingCard from '../../Loading';
import DesktopView from './DesktopView';
import MobileView from './MobileView';
import CarCardViewModel from './ViewModel';

import { CarsStoreContext } from 'src/modules/cars/store';

interface CarCardProps {
  car: Car | undefined;
  position: number;
}

const CarCard: React.FC<CarCardProps> = ({ car, position }) => {
  const carsStore = useContext(CarsStoreContext);
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));

  if (!car) {
    return <LoadingCard />;
  }
  const viewModel = new CarCardViewModel(carsStore, car, position);
  if (xsDown) {
    return <MobileView viewModel={viewModel} />;
  }
  return <DesktopView viewModel={viewModel} />;
};

export default CarCard;
