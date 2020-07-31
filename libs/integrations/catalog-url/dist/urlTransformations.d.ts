import { FiltersData } from './types';
export declare const getDescriptorParam: (filtersData: FiltersData) => string;
export declare const getYearParam: (filtersData: FiltersData) => string;
export declare const getParams: (filtersData?: FiltersData | undefined) => string;
export declare const getQuery: (filtersData?: FiltersData | undefined) => string;
export declare const getUrlFromFiltersData: (filtersData?: FiltersData | undefined) => string;
export declare const getFiltersDataFromUrl: (filtersQueryParam?: string | undefined) => FiltersData | undefined;
