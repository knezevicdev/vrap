import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Car } from '@vroom-web/inv-search-networking';
import React from 'react';

import DesktopView from './DesktopView';
import LoadingCard from './Loading';
import MobileView from './MobileView';
import CarCardViewModel from './ViewModel';

import { CarsStoreContext } from 'src/modules/cars/store';

interface CarCardProps {
  car: Car | undefined;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const theme = useTheme();
  const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <CarsStoreContext.Consumer>
      {(carsStore): JSX.Element => {
        if (!car) {
          return <LoadingCard mobile={xsDown} />;
        }
        const viewModel = new CarCardViewModel(carsStore, car);
        if (xsDown) {
          return <MobileView viewModel={viewModel} />;
        }
        return <DesktopView viewModel={viewModel} />;
      }}
    </CarsStoreContext.Consumer>
  );
};

export default CarCard;
