import { checkAppraisalPayload } from '../utils';

describe('test functions in utils', () => {
  test('test checkAppraisalPayload ', () => {
    const req = {
      firstName: 'fname',
      lastName: 'lname',
      phoneNumber: '555-555-5555',
      zipCode: '94019',
      email: 'test.test1@gmail.com',
      expectedOffer: 10000,
      lead_id: '123-d0845cbe4aa172732c2464e1177b',
      vin: 'abcded',
      options: ['Power Moonroof', 'Preferred Accessory Package', 'abc'],
    };
    const score = checkAppraisalPayload(req);
    expect(score).toEqual(11);
  });
});
