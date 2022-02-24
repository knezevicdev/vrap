import { lang } from '../Components.language';

describe('components language test', () => {
  test('test const', () => {
    expect(lang.errorMessage('email')).toEqual('please enter a valid email');
  });
});
