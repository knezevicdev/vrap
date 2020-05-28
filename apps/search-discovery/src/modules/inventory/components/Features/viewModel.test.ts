import { InventoryStore } from '../../store';
import viewModel from './ViewModel';

describe('display', () => {
  test('constructor', () => {
    const partial = {
      vehicle: {
        _source: { optionalFeatures: 'a,b,c,d' },
      },
    } as InventoryStore;
    const vm = new viewModel(partial);
    expect(vm.features).toEqual(['a', 'b', 'c', 'd']);
    expect(vm.limitedLength).toEqual(15);
  });

  test('features < limitedLength, limited', () => {
    const partial = {
      vehicle: {
        _source: { optionalFeatures: 'a,b,c,d,e,f,g,h' },
      },
    } as InventoryStore;
    const vm = new viewModel(partial);
    const result = vm.display(true);

    expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', '1 Key']);
  });

  test('features < limitedLength, not limited', () => {
    const partial = {
      vehicle: {
        _source: { optionalFeatures: 'a,b,c,d,e,f,g,h' },
      },
    } as InventoryStore;
    const vm = new viewModel(partial);
    const result = vm.display(false);

    expect(result).toEqual(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', '1 Key']);
  });

  test('features = limitedLength, limited', () => {
    const partial = {
      vehicle: {
        _source: { optionalFeatures: 'a,b,c,d,e,f,g,h' },
      },
    } as InventoryStore;
    const vm = new viewModel(partial, 8);
    const result = vm.display(true);

    expect(result).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      '1 Key',
      '<button>Show More</button>',
    ]);
  });

  test('features > limitedLength, limited', () => {
    const partial = {
      vehicle: {
        _source: { optionalFeatures: 'a,b,c,d,e,f,g,h' },
      },
    } as InventoryStore;
    const vm = new viewModel(partial, 4);
    const result = vm.display(true);

    expect(result).toEqual(['a', 'b', '1 Key', '<button>Show More</button>']);
  });

  test('features >= limitedLength, limited', () => {
    const partial = {
      vehicle: {
        _source: { optionalFeatures: 'a,b,c,d,e,f,g,h' },
      },
    } as InventoryStore;
    const vm = new viewModel(partial, 4);
    const result = vm.display(false);

    expect(result).toEqual([
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      '1 Key',
      '<button>Show Less</button>',
    ]);
  });
});
