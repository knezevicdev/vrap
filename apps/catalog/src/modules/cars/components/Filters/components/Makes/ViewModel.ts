import { CarsStore } from '../../../../store';
import { Model } from './components/Models/ViewModel';
import MakesStore from './store';

interface Make {
  display: string;
  slug: string;
  isSelected: boolean;
  models: Model[];
}

class MakesViewModel {
  private readonly carsStore: CarsStore;
  private readonly makesStore: MakesStore;

  constructor(carsStore: CarsStore, makesStore: MakesStore) {
    this.carsStore = carsStore;
    this.makesStore = makesStore;
  }

  getMakes = (): Make[] => {
    if (!this.carsStore.makeBuckets) {
      return [];
    }

    const makes: Make[] = this.carsStore.makeBuckets
      .slice()
      .sort((a, b) => {
        return a.key > b.key ? 1 : -1;
      })
      .map((makeBucket) => ({
        display: makeBucket.key,
        slug: makeBucket.slug,
        isSelected:
          this.makesStore.makesVisibility.indexOf(makeBucket.slug) > -1,
        models: makeBucket.model_count.buckets.map((modelBucket) => ({
          display: modelBucket.key,
          slug: modelBucket.slug,
        })),
      }));

    return this.makesStore.showMore ? makes : makes.slice(0, 10);
  };

  getShowMoreLabel = (): string => {
    return this.makesStore.showMore ? 'Show Less' : 'Show More';
  };

  toggleShowMore = (): void => {
    this.makesStore.toggleShowMore();
  };

  toggleMakesVisibility = (make: string): void => {
    this.makesStore.toggleMakesVisibility(make);
  };
}

export default MakesViewModel;
