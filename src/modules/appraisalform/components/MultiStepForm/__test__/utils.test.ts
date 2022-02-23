import * as Utils from '../utils';

describe('test uitls in MultiStepForm', () => {
  it('test value ', () => {
    expect(Utils.blueIcons).toEqual({
      0: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/1-active.svg`,
      1: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/2-active.svg`,
      2: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/3-active.svg`,
      3: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/4-active.svg`,
      4: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/5-active.svg`,
      5: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/6-active.svg`,
    });

    expect(Utils.grayIcons).toEqual({
      1: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/2-inactive.svg`,
      2: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/3-inactive.svg`,
      3: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/4-inactive.svg`,
      4: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/5-inactive.svg`,
      5: `https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/6-inactive.svg`,
    });
    expect(Utils.greenCheckPath).toEqual(
      'https://assets.vroomcdn.com/static-rebrand/icons/svg/400-gt/check-mark-green.svg'
    );
  });
});
