import {
  BodyType,
  Color,
  Cylinder,
  DriveType,
  Filters,
  FiltersData,
  FuelType,
  Make,
  MaxAndMin,
  SortBy,
  SortDirection,
  TestDrive,
  Transmission,
} from './types';

export const deepCopyFiltersData = (filtersData: FiltersData): FiltersData => {
  return JSON.parse(JSON.stringify(filtersData)) as FiltersData;
};

export const resetFilter = (
  filter: Filters,
  filtersData: FiltersData | undefined
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[filter] = undefined;
  return newFiltersData;
};

export const resetFilters = (
  filters: Filters[],
  filtersData: FiltersData | undefined
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  filters.forEach((filter) => {
    newFiltersData[filter] = undefined;
  });
  return newFiltersData;
};

export const addBodyType = (
  bodyType: BodyType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const newBodyTypes = newFiltersData[Filters.BODY_TYPES] || [];
  newBodyTypes.push(bodyType);
  newFiltersData[Filters.BODY_TYPES] = newBodyTypes;
  return newFiltersData;
};

export const removeBodyType = (
  bodyType: BodyType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingBodyTypes = newFiltersData[Filters.BODY_TYPES] || [];
  const newBodyTypes = existingBodyTypes.filter((bt) => bt !== bodyType);
  newFiltersData[Filters.BODY_TYPES] =
    newBodyTypes.length > 0 ? newBodyTypes : undefined;
  return newFiltersData;
};

export const addFuelType = (
  fuelType: FuelType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const newFuelType = newFiltersData[Filters.FUEL_TYPE] || [];
  newFuelType.push(fuelType);
  newFiltersData[Filters.FUEL_TYPE] = newFuelType;
  return newFiltersData;
};

export const removeFuelType = (
  fuelType: FuelType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingFuelType = newFiltersData[Filters.FUEL_TYPE] || [];
  const newFuelType = existingFuelType.filter((c) => c !== fuelType);
  newFiltersData[Filters.FUEL_TYPE] =
    newFuelType.length > 0 ? newFuelType : undefined;
  return newFiltersData;
};

export const addCylinder = (
  cylinder: Cylinder,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const newCylinders = newFiltersData[Filters.CYLINDERS] || [];
  newCylinders.push(cylinder);
  newFiltersData[Filters.CYLINDERS] = newCylinders;
  return newFiltersData;
};

export const removeCylinder = (
  cylinder: Cylinder,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingCylinders = newFiltersData[Filters.CYLINDERS] || [];
  const newCylinders = existingCylinders.filter((c) => c !== cylinder);
  newFiltersData[Filters.CYLINDERS] =
    newCylinders.length > 0 ? newCylinders : undefined;
  return newFiltersData;
};

export const setOtherCylinders = (
  otherCylinders: boolean,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.OTHER_CYLINDERS] = otherCylinders;
  return newFiltersData;
};

export const addColor = (
  color: Color,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const newColors = newFiltersData[Filters.COLORS] || [];
  newColors.push(color);
  newFiltersData[Filters.COLORS] = newColors;
  return newFiltersData;
};

export const removeColor = (
  color: Color,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingColors = newFiltersData[Filters.COLORS] || [];
  const newColors = existingColors.filter((c) => c !== color);
  newFiltersData[Filters.COLORS] = newColors.length > 0 ? newColors : undefined;
  return newFiltersData;
};

export const addDriveType = (
  driveType: DriveType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const newDriveTypes = newFiltersData[Filters.DRIVE_TYPE] || [];
  newDriveTypes.push(driveType);
  newFiltersData[Filters.DRIVE_TYPE] = newDriveTypes;
  return newFiltersData;
};

export const removeDriveType = (
  driveType: DriveType,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingDriveTypes = newFiltersData[Filters.DRIVE_TYPE] || [];
  const newDriveTypes = existingDriveTypes.filter((dt) => dt !== driveType);
  newFiltersData[Filters.DRIVE_TYPE] =
    newDriveTypes.length > 0 ? newDriveTypes : undefined;
  return newFiltersData;
};

export const setTestDrive = (
  testDrive: TestDrive,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.TEST_DRIVE] = testDrive;
  return newFiltersData;
};

export const setTransmission = (
  transmission: Transmission,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.TRANSMISSION] = transmission;
  return newFiltersData;
};

export const addAllModels = (
  makeSlug: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingMakeAndModels = newFiltersData[Filters.MAKE_AND_MODELS] || [];
  const newMakeAndModels = existingMakeAndModels.filter(
    (m) => m.makeSlug !== makeSlug
  );
  newMakeAndModels.push({ makeSlug });
  newFiltersData[Filters.MAKE_AND_MODELS] =
    newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};

export const removeAllModels = (
  makeSlug: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingMakeAndModels = newFiltersData[Filters.MAKE_AND_MODELS] || [];
  const newMakeAndModels = existingMakeAndModels.filter(
    (m) => m.makeSlug !== makeSlug
  );
  newFiltersData[Filters.MAKE_AND_MODELS] =
    newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};

export const addModel = (
  makeSlug: string,
  modelSlug: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingMakeAndModels = newFiltersData[Filters.MAKE_AND_MODELS] || [];
  const existingMake: Make = existingMakeAndModels.find(
    (m) => m.makeSlug === makeSlug
  ) || { makeSlug };
  const existingModels: string[] = existingMake.modelSlugs || [];
  const newModels: string[] = existingModels.includes(modelSlug)
    ? existingModels
    : existingModels.concat([modelSlug]);
  const newMake: Make = {
    makeSlug,
    modelSlugs: newModels,
  };
  const newMakeAndModels = existingMakeAndModels.filter(
    (m) => m.makeSlug !== makeSlug
  );
  newMakeAndModels.push(newMake);
  newFiltersData[Filters.MAKE_AND_MODELS] =
    newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};

export const removeModel = (
  makeSlug: string,
  modelSlug: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  const existingMakeAndModels = newFiltersData[Filters.MAKE_AND_MODELS] || [];
  const existingMake: Make = existingMakeAndModels.find(
    (m) => m.makeSlug === makeSlug
  ) || { makeSlug };
  const existingModels: string[] = existingMake.modelSlugs || [];
  const newModels: string[] = existingModels.includes(modelSlug)
    ? existingModels.filter((m) => m !== modelSlug)
    : existingModels;
  const newMake: Make | undefined =
    newModels.length > 0
      ? {
          makeSlug,
          modelSlugs: newModels,
        }
      : undefined;
  const newMakeAndModels = existingMakeAndModels.filter(
    (m) => m.makeSlug !== makeSlug
  );
  !!newMake && newMakeAndModels.push(newMake);
  newFiltersData[Filters.MAKE_AND_MODELS] =
    newMakeAndModels.length > 0 ? newMakeAndModels : undefined;
  return newFiltersData;
};

export const setMiles = (
  miles: MaxAndMin,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.MILES] = miles;
  return newFiltersData;
};

export const setPage = (
  page: number,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.PAGE] = page;
  return newFiltersData;
};

export const setPrice = (
  price: MaxAndMin,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.PRICE] = price;
  return newFiltersData;
};

export const setSearch = (
  search: string,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.SEARCH] = search;
  return newFiltersData;
};

export const setSort = (
  by: SortBy,
  direction: SortDirection,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.SORT] = {
    by,
    direction,
  };
  return newFiltersData;
};

export const setYear = (
  year: MaxAndMin,
  filtersData?: FiltersData
): FiltersData => {
  const newFiltersData = deepCopyFiltersData(filtersData || {});
  newFiltersData[Filters.YEAR] = year;
  return newFiltersData;
};
