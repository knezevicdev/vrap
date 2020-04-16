import { NextPageContext } from 'next';
import React from 'react';

import Page from 'src/components/Page';
import Cars from 'src/modules/cars';
import { Store } from 'src/modules/cars/store';
import {
  CarsContext,
  fetchInventoryData,
  fetchPopularCars,
  getDataForMakeAndModels,
  Props,
} from 'src/modules/cars/util';

class CarsPage extends React.Component<Props> {
  private readonly store: Store;

  static async getInitialProps(context: NextPageContext): Promise<Props> {
    const {
      query: { filters },
    } = context;

    const makeAndModelsData = await getDataForMakeAndModels();
    const inventoryData = await fetchInventoryData(filters, makeAndModelsData);
    const hasNoResults = inventoryData?.data.hits.total === 0;
    const popularCarsData = hasNoResults ? await fetchPopularCars() : undefined;

    return {
      makeAndModelsData: makeAndModelsData,
      inventoryData: inventoryData,
      popularCarsData: popularCarsData,
      serverQueryFilters: filters,
    };
  }

  constructor(props: Props) {
    super(props);
    const {
      makeAndModelsData,
      inventoryData,
      popularCarsData,
      serverQueryFilters,
    } = props;

    this.store = new Store(
      false,
      inventoryData,
      makeAndModelsData,
      popularCarsData,
      serverQueryFilters
    );
  }

  render(): JSX.Element {
    const title = 'Shop Used Cars Online - Rocket Auto';
    const description =
      'Buy your next car online with Rocket Auto. We offer certified used vehicles, easy car buying, and delivery anywhere in the USA.';

    const head = (
      <>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
      </>
    );

    return (
      <Page name="Catalog" head={head}>
        <CarsContext.Provider value={{ store: this.store }}>
          <Cars />
        </CarsContext.Provider>
      </Page>
    );
  }
}

export default CarsPage;
