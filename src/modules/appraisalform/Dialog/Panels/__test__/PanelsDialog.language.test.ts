import { lang } from '../PanelsDialog.language';

describe('exact milage dialog language test', () => {
  test('test const', () => {
    expect(lang.title).toEqual('body panels');
    expect(lang.desc).toEqual(
      'The individual pieces that make up the exterior of your vehicle are body panels. Bumpers, doors, fenders, grills, and trunks are examples of panels.'
    );
  });
});
