import { FeaturesStore } from 'src/modules/inventory/Santader/components/Features/store';

describe('Features Store Test', () => {
  const store = new FeaturesStore();
  it('should toggle', () => {
    expect(store.limited).toBeTruthy();
    store.toggleLimited();
    expect(store.limited).toBeFalsy();
    store.toggleLimited();
    expect(store.limited).toBeTruthy();
  });
});
