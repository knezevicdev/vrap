/*
  TODO
  Come back and clean this util and the cars util
 */

import { Base64 } from 'js-base64';
import { NextRouter } from 'next/router';
import { stringify } from 'qs';

import { Filters, FiltersData, getFiltersDataFromUrl, Pathname } from '../util';

export const ALL_KEY = 'all';

const sanitize = (str: string): string => {
  const toUnderscoreRegex = /-| /g;
  return str.replace(toUnderscoreRegex, '_').toLowerCase();
};

const encodeFilters = (filters: FiltersData): string => {
  return Base64.encode(stringify(filters, { encode: false }));
};

const updateUrl = (
  filters: FiltersData | undefined,
  router: NextRouter,
  changedPage?: boolean
): void => {
  let asParams = '';

  const { replace, push } = router;
  const updatedFilters = changedPage
    ? filters
    : { ...filters, page: undefined };
  const stringQuery = updatedFilters ? encodeFilters(updatedFilters) : '';
  const asQuery = stringQuery ? `?filters=${stringQuery}` : '';
  const query = stringQuery ? { filters: stringQuery } : {};

  if (filters) {
    const yearFromFilters = filters[Filters.YEAR];
    const year = yearFromFilters
      ? yearFromFilters.min === yearFromFilters.max
        ? `/${yearFromFilters.min}`
        : `/${yearFromFilters.min}-${yearFromFilters.max}`
      : '';

    const bodyTypesFromFilters = filters[Filters.BODY_TYPES];
    const bodyType = bodyTypesFromFilters ? bodyTypesFromFilters[0] : undefined;
    const makeAndModelsFromFilters = filters[Filters.MAKE_AND_MODELS];
    const makeKeys = makeAndModelsFromFilters
      ? Object.keys(makeAndModelsFromFilters)
      : undefined;
    const make = makeKeys ? makeKeys[0] : undefined;
    const models = make
      ? makeAndModelsFromFilters && makeAndModelsFromFilters[make]
      : undefined;
    const model = models && models[0] !== 'all' ? models[0] : undefined;
    const descriptorsCombined = [make, model, bodyType]
      .filter(value => value)
      .join('-');
    const descriptor = descriptorsCombined ? `/${descriptorsCombined}` : '';

    asParams = `${descriptor}${year}`;
  }

  const pathname = asParams ? Pathname.WITH_PARAMS : Pathname.WITHOUT_PARAMS;

  const as = `/cars${asParams}${asQuery}`;

  const isCatalog =
    router.pathname === Pathname.WITH_PARAMS ||
    router.pathname === Pathname.WITHOUT_PARAMS;

  if (isCatalog) {
    replace({ pathname: pathname, query: query }, as, { shallow: true });
  } else {
    push({ pathname: pathname, query: query }, as);
  }
};

const removeMakeOrModel = (
  router: NextRouter,
  make: string,
  model: string
): void => {
  const {
    query: { filters },
  } = router;

  const urlFilters = getFiltersDataFromUrl(filters);
  const key = Filters.MAKE_AND_MODELS;
  const modelToRemove = sanitize(model);
  const makeToLookAt = sanitize(make);

  const makesAndModels = urlFilters && urlFilters[key];
  if (makesAndModels) {
    const make = makesAndModels[makeToLookAt];
    if (make) {
      make.splice(make.indexOf(modelToRemove), 1);
      if (make.length === 0) {
        delete makesAndModels[makeToLookAt];
      }
    }
  }
  updateUrl(urlFilters, router);
};

export { encodeFilters, updateUrl, sanitize, removeMakeOrModel };
