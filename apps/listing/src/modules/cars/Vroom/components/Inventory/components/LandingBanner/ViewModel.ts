import { Filters } from '@vroom-web/catalog-url-integration';

import { CarsStore } from 'src/modules/cars/store';

class LandingBannerViewModel {
  private readonly carsStore: CarsStore;
  readonly jeepWranglerText: string = 'Get to Know Jeep Wrangler';
  constructor(carsStore: CarsStore) {
    this.carsStore = carsStore;
  }

  showJeepWranglerBanner(): boolean {
    const filtersData = this.carsStore.filtersData;
    const filtersDataMakesAndModels =
      filtersData && filtersData[Filters.MAKE_AND_MODELS];
    let foundJeepWrangler = false;
    if (filtersDataMakesAndModels) {
      filtersDataMakesAndModels.forEach((filtersDataMakeAndModels) => {
        const foundJeep = filtersDataMakeAndModels.makeSlug === 'jeep';
        if (foundJeep) {
          if (filtersDataMakeAndModels.modelSlugs) {
            filtersDataMakeAndModels.modelSlugs.forEach((modelSlug) => {
              foundJeepWrangler = modelSlug === 'wrangler';
            });
          }
        }
      });
    }
    return !!foundJeepWrangler;
  }

  handleBannerClick(): void {
    window.open('https://www.vroom.com/landing/jeep/wrangler', '_blank');
  }
}

export default LandingBannerViewModel;
