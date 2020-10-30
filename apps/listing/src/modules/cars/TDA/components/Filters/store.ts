import { action, IObservableArray, observable } from 'mobx';

import BodyTypes from './components/BodyTypes';
import Color from './components/Color';
import EngineAndDrivetrain from './components/EngineAndDrivetrain';
import Makes from './components/Makes';
import Miles from './components/Miles';
import Price from './components/Price';
import TestDrive from './components/TestDrive';
import Year from './components/Year';

export enum FilterDisplay {
  MAKE_AND_MODEL = 'Make & Model',
  BODY_TYPE = 'Body Type',
  COLOR = 'Color',
  YEAR = 'Year',
  PRICE = 'Price',
  MILES = 'Miles',
  ENGINE_AND_DRIVETRAIN = 'Engine & Drivetrain',
  TEST_DRIVE = 'Test Drive',
}

export interface Filter {
  display: FilterDisplay;
  FilterComponent: React.FC;
  open: boolean;
}

class FiltersStore {
  readonly filters: IObservableArray<Filter> = observable([
    {
      display: FilterDisplay.TEST_DRIVE,
      FilterComponent: TestDrive,
      open: true,
    },
    {
      display: FilterDisplay.MAKE_AND_MODEL,
      FilterComponent: Makes,
      open: false,
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
      display: FilterDisplay.ENGINE_AND_DRIVETRAIN,
      FilterComponent: EngineAndDrivetrain,
      open: false,
    },
  ]);

  @action
  toggleVisibility = (filter: Filter): void => {
    const matchingFilter = this.filters.find(
      (f) => f.display === filter.display
    );
    if (matchingFilter) {
      matchingFilter.open = !matchingFilter.open;
    }
  };
}

export default FiltersStore;