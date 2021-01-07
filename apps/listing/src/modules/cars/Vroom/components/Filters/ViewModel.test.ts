import BodyTypes from './components/BodyTypes';
import Color from './components/Color';
import EngineAndDrivetrain from './components/EngineAndDrivetrain';
import Features from './components/Features';
import FuelAndEfficiency from './components/FuelAndEfficiency';
import Makes from './components/Makes';
import Miles from './components/Miles';
import Price from './components/Price';
import Year from './components/Year';
import FiltersStore, { FilterDisplay } from './store';
import ViewModel from './ViewModel';

import { CarsStore } from 'src/modules/cars/store';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
    };
  };
});

describe('Filters View Model', () => {
  let filtersStore: FiltersStore;
  let carStore: CarsStore;
  let viewModel: ViewModel;

  describe('getFilters', () => {
    filtersStore = new FiltersStore();
    carStore = new CarsStore();
    viewModel = new ViewModel(carStore, filtersStore);
    it(`should return all the filters`, () => {
      const filters = [
        {
          display: FilterDisplay.MAKE_AND_MODEL,
          FilterComponent: Makes,
          open: true,
        },
        {
          display: FilterDisplay.BODY_TYPE,
          FilterComponent: BodyTypes,
          open: false,
        },
        {
          display: FilterDisplay.COLOR,
          FilterComponent: Color,
          open: false,
        },
        {
          display: FilterDisplay.YEAR,
          FilterComponent: Year,
          open: false,
        },
        {
          display: FilterDisplay.PRICE,
          FilterComponent: Price,
          open: false,
        },
        {
          display: FilterDisplay.MILES,
          FilterComponent: Miles,
          open: false,
        },
        {
          display: FilterDisplay.FUEL_AND_EFFICIENCY,
          FilterComponent: FuelAndEfficiency,
          open: false,
        },
        {
          display: FilterDisplay.ENGINE_AND_DRIVETRAIN,
          FilterComponent: EngineAndDrivetrain,
          open: false,
        },
        {
          display: FilterDisplay.POPULAR_FEATURES,
          FilterComponent: Features,
          open: false,
        },
      ];
      const getFiltersReturn = viewModel.getFilters();

      expect(filters).toEqual(getFiltersReturn);
    });
  });
});
