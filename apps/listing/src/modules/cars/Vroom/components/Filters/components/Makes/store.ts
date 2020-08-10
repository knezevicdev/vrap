import { action, IObservableArray, observable } from 'mobx';

class MakesStore {
  @observable showMore = false;
  readonly makesVisibility: IObservableArray<string> = observable([]);

  @action
  toggleShowMore = (): void => {
    this.showMore = !this.showMore;
  };

  @action
  toggleMakesVisibility = (make: string): void => {
    const isOpen = this.makesVisibility.find((m) => m === make);
    if (isOpen) {
      this.makesVisibility.remove(make);
    } else {
      this.makesVisibility.push(make);
    }
  };
}

export default MakesStore;
