import { BodyType, Color, DriveType, Filters, FiltersData, MaxAndMin, SortBy, SortDirection, Transmission } from './types';
export declare const deepCopyFiltersData: (filtersData: FiltersData) => FiltersData;
export declare const resetFilter: (filter: Filters, filtersData: FiltersData | undefined) => FiltersData;
export declare const resetFilters: (filters: Filters[], filtersData: FiltersData | undefined) => FiltersData;
export declare const addBodyType: (bodyType: BodyType, filtersData?: FiltersData | undefined) => FiltersData;
export declare const removeBodyType: (bodyType: BodyType, filtersData?: FiltersData | undefined) => FiltersData;
export declare const addColor: (color: Color, filtersData?: FiltersData | undefined) => FiltersData;
export declare const removeColor: (color: Color, filtersData?: FiltersData | undefined) => FiltersData;
export declare const addDriveType: (driveType: DriveType, filtersData?: FiltersData | undefined) => FiltersData;
export declare const removeDriveType: (driveType: DriveType, filtersData?: FiltersData | undefined) => FiltersData;
export declare const setTransmission: (transmission: Transmission, filtersData?: FiltersData | undefined) => FiltersData;
export declare const addAllModels: (makeSlug: string, filtersData?: FiltersData | undefined) => FiltersData;
export declare const removeAllModels: (makeSlug: string, filtersData?: FiltersData | undefined) => FiltersData;
export declare const addModel: (makeSlug: string, modelSlug: string, filtersData?: FiltersData | undefined) => FiltersData;
export declare const removeModel: (makeSlug: string, modelSlug: string, filtersData?: FiltersData | undefined) => FiltersData;
export declare const setMiles: (miles: MaxAndMin, filtersData?: FiltersData | undefined) => FiltersData;
export declare const setPage: (page: number, filtersData?: FiltersData | undefined) => FiltersData;
export declare const setPrice: (price: MaxAndMin, filtersData?: FiltersData | undefined) => FiltersData;
export declare const setSearch: (search: string, filtersData?: FiltersData | undefined) => FiltersData;
export declare const setSort: (by: SortBy, direction: SortDirection, filtersData?: FiltersData | undefined) => FiltersData;
export declare const setYear: (year: MaxAndMin, filtersData?: FiltersData | undefined) => FiltersData;
