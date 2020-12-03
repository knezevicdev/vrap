import { Brand, determineWhitelabel, NextContext } from './';

describe('determineWhiteLabel function', () => {
  const mockDefaultReq = ({
    query: {},
  } as unknown) as NextContext;

  const mockTDAHeaderReq = ({
    req: { headers: { 'x-brand': Brand.TDA } },
    query: {},
  } as unknown) as NextContext;

  const mockSantanderParamReq = ({
    query: { brand: Brand.SANTANDER },
  } as unknown) as NextContext;

  test('No header or params passed in, should default to vroom', () => {
    expect(determineWhitelabel(mockDefaultReq)).toEqual(Brand.VROOM);
  });
  test('Passing in branded header should return correct brand', () => {
    expect(determineWhitelabel(mockTDAHeaderReq)).toEqual(Brand.TDA);
  });
  test('Passing in brand query param should return correct brand', () => {
    expect(determineWhitelabel(mockSantanderParamReq)).toEqual(Brand.SANTANDER);
  });
});
