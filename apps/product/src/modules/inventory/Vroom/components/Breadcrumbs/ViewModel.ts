/* eslint-disable @typescript-eslint/camelcase */
import {
  addAllModels,
  addModel,
  getUrlFromFiltersData,
} from '@vroom-web/catalog-url-integration';
import { Car } from '@vroom-web/inv-search-networking';
import { stringify } from 'qs';
import { ParsedUrlQuery } from 'querystring';

import { InventoryStore } from 'src/modules/inventory/store';

interface Crumb {
  key: string;
  name: string;
  path: string;
}

class BreadcrumbsViewModel {
  private car: Car;
  private query: ParsedUrlQuery;

  constructor(query: ParsedUrlQuery, inventoryStore: InventoryStore) {
    this.car = inventoryStore.vehicle._source;
    this.query = query;
  }

  crumbs(): Crumb[] {
    const { make, makeSlug, model, modelSlug, year } = this.car;

    // FIT-582
    // Persist attributuion query params across navigation.
    // This is a stopgap so vlassic attributuion works.
    // TODO: remove query param persistence when a better attribution system is in place.
    const {
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
    } = this.query;
    const attributionQueryString = stringify({
      gclid,
      subid,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      utm_keyword,
      utm_subsource,
      utm_site,
    });

    const catalogHref = getUrlFromFiltersData();
    const catalogHrefQueryStringPrefix =
      catalogHref.indexOf('?') === -1 ? '?' : '&';
    const catalogPath = `${catalogHref}${catalogHrefQueryStringPrefix}${attributionQueryString}`;

    const allModelsFiltersData = addAllModels(makeSlug);
    const allModelsHref = getUrlFromFiltersData(allModelsFiltersData);
    const allModelsHrefQueryStringPrefix =
      allModelsHref.indexOf('?') === -1 ? '?' : '&';
    const allModelsPath = `${allModelsHref}${allModelsHrefQueryStringPrefix}${attributionQueryString}`;

    const modelFiltersData = addModel(makeSlug, modelSlug);
    const modelHref = getUrlFromFiltersData(modelFiltersData);
    const modelHrefQueryStringPrefix =
      modelHref.indexOf('?') === -1 ? '?' : '&';
    const modelPath = `${modelHref}${modelHrefQueryStringPrefix}${attributionQueryString}`;

    return [
      {
        key: 'all',
        name: 'All Cars',
        path: catalogPath,
      },
      {
        key: 'make',
        name: make,
        path: allModelsPath,
      },
      {
        key: 'model',
        name: model,
        path: modelPath,
      },
      {
        key: 'ymm',
        name: `${year} ${make} ${model}`,
        path: '',
      },
    ];
  }
}

export default BreadcrumbsViewModel;
