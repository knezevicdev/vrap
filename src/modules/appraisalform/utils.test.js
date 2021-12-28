/* global describe, test, expect */
import * as utils from './lib/utils/utils';
import { PATHS } from './constants/routes';

describe('removeTrailingSlash', () => {
  test('should return strings without slashes as is', () => {
    expect(utils.removeTrailingSlash('hello vroom')).toBe('hello vroom');
  });

  test('should not remove leading slash', () => {
    expect(utils.removeTrailingSlash('/vroom')).toBe('/vroom');
  });

  test('should remove trailing slash', () => {
    expect(utils.removeTrailingSlash('https://vroom.com/')).toBe(
      'https://vroom.com'
    );
  });

  test('should remove trailing slashes', () => {
    expect(utils.removeTrailingSlash('https://vroom.com//')).toBe(
      'https://vroom.com'
    );
    expect(
      utils.removeTrailingSlash('https://vroom.com//////////////////')
    ).toBe('https://vroom.com');
  });
});

describe('parseQueryString', () => {
  test('Should parse an offer search string correctly', () => {
    const parsedValue = {
      offer:
        '1c5d3791884b20bd18b4066b17c41d821faa6102300d227a272139180494d9346b453af568f21b5e9550e68f9ef190a9fd3982180dd62d6d23c439a515b1bc8d115eb1fa70079f57e1e845e870d13bebe4333dd3adc0cc4f5278eac0410c218c4eaf9fd2487403646c02e324af5ef58711c7e169e51add5853fbd973fd37aa67c807bffab7ba2da5aba525b3fe9cc61a5033bd91218902fe6191aa50d4b6927074e412588a6c83265555f9d9c5bfb721915ef1f7aa16f2316a9037d654bbc55d3505cc3f766cb8c86d570a5e096f4f1bab6c14ba091142c54cb981a6af4e52c8929bc820d61d3d4bc993c5d0b69ca66f209dbe7fad0b4dd2df127e8f084327c9940ec92e28215f0f1506a3c73dffbeb2a8f6d5c87fb62ff3eeac94b8e08ac2ca99944585f27760b9550e296e7ec5f453ed61f4c927e151adfaa5b245bdc85a93',
      hash: 'ee6209d41fab5763f4c962eb62dee5385ec8c903'
    };
    expect(
      utils.parseQueryString(
        '?offer=1c5d3791884b20bd18b4066b17c41d821faa6102300d227a272139180494d9346b453af568f21b5e9550e68f9ef190a9fd3982180dd62d6d23c439a515b1bc8d115eb1fa70079f57e1e845e870d13bebe4333dd3adc0cc4f5278eac0410c218c4eaf9fd2487403646c02e324af5ef58711c7e169e51add5853fbd973fd37aa67c807bffab7ba2da5aba525b3fe9cc61a5033bd91218902fe6191aa50d4b6927074e412588a6c83265555f9d9c5bfb721915ef1f7aa16f2316a9037d654bbc55d3505cc3f766cb8c86d570a5e096f4f1bab6c14ba091142c54cb981a6af4e52c8929bc820d61d3d4bc993c5d0b69ca66f209dbe7fad0b4dd2df127e8f084327c9940ec92e28215f0f1506a3c73dffbeb2a8f6d5c87fb62ff3eeac94b8e08ac2ca99944585f27760b9550e296e7ec5f453ed61f4c927e151adfaa5b245bdc85a93&hash=ee6209d41fab5763f4c962eb62dee5385ec8c903'
      )
    ).toEqual(parsedValue);
  });
});

describe('Hi-Res Image Helper', () => {
  test('Should parse an image URL and return Hi-Res Image URL', () => {
    const imageUrl =
      'https://images-qa.vroomcdn.com/1GNFLFEK6EZ117834/002_0002.jpg';
    const hiResImageUrl =
      'https://images-qa.vroomcdn.com/1GNFLFEK6EZ117834/hr/002_0002.jpg';

    expect(utils.getHiResImageUrl(imageUrl)).toEqual(hiResImageUrl);
  });
});

describe('toQueryString', () => {
  it('should return an empty string when null is passed', () => {
    expect(utils.toQueryString(null)).toBe('');
  });

  it('should return an empty string when {} is passed', () => {
    expect(utils.toQueryString({})).toBe('');
  });

  it('should return a query string when a real object is passed', () => {
    const urlParams = {
      first_param: 'param1',
      second_param: 'param2'
    };
    expect(utils.toQueryString(urlParams)).toBe(
      '?first_param=param1&second_param=param2'
    );
  });

  it('should return a query string when a bodyType is in the object passed', () => {
    //not sure if this actually tests the conditional in the map
    const urlParams = {
      bodyType: ['SUV', 'other']
    };
    expect(utils.toQueryString(urlParams)).toBe('?bodyType=SUV&bodyType=other');
  });
});

describe('returnOnlyUtmQueries', () => {
  it('should return utm queries when a string is passed', () => {
    expect(
      utils.returnOnlyUtmQueries(
        '?utm_source=tda&utm_campaign=national&tester=tests'
      )
    ).toBe('?utm_source=tda&utm_campaign=national');
  });
  it('should return utm queries when an object is passed', () => {
    const utmQueries = {
      utm_source: 'tda',
      utm_campaign: 'national',
      tester: 'tests'
    };
    const expectedUtmQueries = {
      utm_source: 'tda',
      utm_campaign: 'national'
    };
    expect(utils.returnOnlyUtmQueries(utmQueries)).toEqual(expectedUtmQueries);
  });
});

describe('addThousandsSeparator', () => {
  it('should add thousands separator when a number is passed', () => {
    expect(utils.addThousandsSeparator(2000)).toBe('2,000');
  });

  it('should add thousands separator when a string is passed', () => {
    expect(utils.addThousandsSeparator('2000')).toBe('2,000');
  });

  it('should get undefined when abc is passed', () => {
    expect(utils.addThousandsSeparator('abc')).toBeUndefined();
  });
});

describe('limitChars', () => {
  it('should add trailing ... when limit is less than string length', () => {
    const stringToLimit = 'string example that happens to be 47 characters';
    const limitedString = 'string example that happens to be 47 ...';

    expect(utils.limitChars(stringToLimit, 40)).toBe(limitedString);
  });
  it('should return string when limit is higher than string length', () => {
    const stringToLimit = 'string example that happens to be 47 characters';
    expect(utils.limitChars(stringToLimit, 50)).toBe(stringToLimit);
  });
  it('should be return value when a non-string is passed', () => {
    expect(utils.limitChars(123456, 3)).toBe(123456);
  });
});

describe('lowerCase', () => {
  it('should convert passed strings to lower case', () => {
    const allCapsString = 'ALL CAPS STRING';
    expect(utils.lowerCase(allCapsString)).toBe('all caps string');
  });
  it('should return value when non-string is passed', () => {
    expect(utils.lowerCase(123)).toBe(123);
  });
});

describe('isEmptyObject', () => {
  it('should return true when object is empty', () => {
    expect(utils.isEmptyObject({})).toBe(true);
  });
  it('should return false when object is populated', () => {
    expect(utils.isEmptyObject({ test: 'test' })).toBe(false);
  });
});

describe('formatKey', () => {
  it('should provide the correct format key when passed element and item', () => {
    expect(utils.formatKey('div', 'uniqueItemId')).toBe('div_uniqueItemId');
  });
});

describe('getHttpFromHttps', () => {
  it('should replace https with http', () => {
    expect(utils.getHttpFromHttps('https://testurl.com')).toBe(
      'http://testurl.com'
    );
  });
});

describe('getNextInList', () => {
  it('should return the next item in array', () => {
    const itemArray = [
      'https://images-qa.vroomcdn.com/JTMWFREV7EJ012620/001_0001.jpg',
      'https://images-qa.vroomcdn.com/JTMWFREV7EJ012620/002_0002.jpg',
      'https://images-qa.vroomcdn.com/JTMWFREV7EJ012620/003_0003.jpg'
    ];
    const current = itemArray[1];
    const start = itemArray[0];
    expect(utils.getNextInList(current, start, itemArray)).toBe(
      'https://images-qa.vroomcdn.com/JTMWFREV7EJ012620/003_0003.jpg'
    );
  });
  it('should return current item is last item', () => {
    const itemArray = [
      'https://images-qa.vroomcdn.com/JTMWFREV7EJ012620/001_0001.jpg',
      'https://images-qa.vroomcdn.com/JTMWFREV7EJ012620/002_0002.jpg',
      'https://images-qa.vroomcdn.com/JTMWFREV7EJ012620/003_0003.jpg'
    ];
    const current = itemArray[2];
    const start = itemArray[0];
    expect(utils.getNextInList(current, start, itemArray)).toBeUndefined();
  });
  it('should return current item is only item in array', () => {
    const itemArray = [
      'https://images-qa.vroomcdn.com/JTMWFREV7EJ012620/001_0001.jpg'
    ];
    const current = itemArray[0];
    const start = itemArray[0];
    expect(utils.getNextInList(current, start, itemArray)).toBeUndefined();
  });
});

describe('kebabPhone', () => {
  it('should format 1234567890 to 123-456-7890', () => {
    expect(utils.kebabPhone('1234567890')).toBe('123-456-7890');
  });
  it('should format return an empty string when phone is wrong length', () => {
    expect(utils.kebabPhone('123456789')).toBe('');
  });
});

describe('parseSalesForceDate', () => {
  it('should return an object with year, month, day, time, weekday', () => {
    const expectedDateObj = {
      day: 26,
      datetime: new Date(2019, 3, 26),
      month: 'April',
      weekday: 'Friday',
      year: 2019
    };
    expect(utils.parseSalesForceDate('20190426')).toEqual(expectedDateObj);
  });
});

describe('isMobile', () => {
  it('should return true when width passed is < 768', () => {
    expect(utils.isMobile(400)).toBe(true);
  });
  it('should return false when width passed is > 768', () => {
    expect(utils.isMobile(800)).toBe(false);
  });
});

describe('isTablet', () => {
  it('should return true when width passed is < 1024 and > 768', () => {
    expect(utils.isTablet(900)).toBe(true);
    expect(utils.isTablet(400)).toBe(false);
  });
  it('should return false when width passed is > 1024', () => {
    expect(utils.isTablet(1200)).toBe(false);
  });
});

describe('isDesktop', () => {
  it('should return true when width passed is < 1280', () => {
    expect(utils.isDesktop(1200)).toBe(true);
  });
  it('should return false when width passed is > 1280', () => {
    expect(utils.isDesktop(1400)).toBe(false);
  });
});

describe('getDeviceType', () => {
  it('should return "mobile" when width passed is < 768', () => {
    expect(utils.getDeviceType(767)).toBe('mobile');
  });
  it('should return "tablet" when width passed is < 1024 and > 768', () => {
    expect(utils.getDeviceType(1000)).toBe('tablet');
  });
  it('should return "desktop" when width passed is > 1024', () => {
    expect(utils.getDeviceType(1280)).toBe('desktop');
  });
});

describe('getPhoneNumberLink', () => {
  it('should return a tel link for phone number passed', () => {
    expect(utils.getPhoneNumberLink('123 456-7890')).toBe('tel:1-123-456-7890');
  });
});

describe('getCatalogParamPath', () => {
  it('should return empty string when year is null', () => {
    expect(utils.getCatalogParamPath()).toBe('');
  });
  it('should return just year when make is null', () => {
    expect(utils.getCatalogParamPath('2019')).toBe('/2019');
  });
  it('should return year and make when body is null', () => {
    expect(utils.getCatalogParamPath('2019', 'toyota')).toBe('/2019/toyota');
  });
  it('should return full path', () => {
    expect(utils.getCatalogParamPath('2019', 'toyota', 'camry')).toBe(
      '/2019/toyota/camry'
    );
  });
});

describe('getResumeStep', () => {
  it('should return PATH for next step from API', () => {
    expect(utils.getResumeStep('RegistrationAddress')).toBe(
      PATHS.registrationAddress
    );
    expect(utils.getResumeStep('Financing')).toBe(PATHS.dealCredit);
    expect(utils.getResumeStep('DepositPaymentInfo')).toBe(PATHS.dealReview);
  });
});
