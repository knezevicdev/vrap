import * as Misc from '../misc';

describe('test misc ', () => {
  it('test const ', () => {
    expect(Misc.DD_PREFIX).toEqual('vroom.website');
    expect(Misc.VROOM_SUPPORT_EMAIL).toEqual('support@vroom.com');
    expect(Misc.VROOM_APPRAISALS_EMAIL).toEqual('appraisals@vroom.com');
    expect(Misc.VROOM_PRIVACY_EMAIL).toEqual('privacy@vroom.com');
    expect(Misc.VROOM_BUSINESS_HOURS).toEqual('11am-7pm EST, Mon-Sat');
    expect(Misc.VROOM_VIN_SUBSTRING).toEqual('1VR00M004L');
    expect(Misc.STATES).toEqual([
      { value: 'AK', label: 'AK' },
      { value: 'AL', label: 'AL' },
      { value: 'AR', label: 'AR' },
      { value: 'AZ', label: 'AZ' },
      { value: 'CA', label: 'CA' },
      { value: 'CO', label: 'CO' },
      { value: 'CT', label: 'CT' },
      { value: 'DC', label: 'DC' },
      { value: 'DE', label: 'DE' },
      { value: 'FL', label: 'FL' },
      { value: 'GA', label: 'GA' },
      { value: 'HI', label: 'HI' },
      { value: 'IA', label: 'IA' },
      { value: 'ID', label: 'ID' },
      { value: 'IL', label: 'IL' },
      { value: 'IN', label: 'IN' },
      { value: 'KS', label: 'KS' },
      { value: 'KY', label: 'KY' },
      { value: 'LA', label: 'LA' },
      { value: 'MA', label: 'MA' },
      { value: 'MD', label: 'MD' },
      { value: 'ME', label: 'ME' },
      { value: 'MI', label: 'MI' },
      { value: 'MN', label: 'MN' },
      { value: 'MO', label: 'MO' },
      { value: 'MS', label: 'MS' },
      { value: 'MT', label: 'MT' },
      { value: 'NC', label: 'NC' },
      { value: 'ND', label: 'ND' },
      { value: 'NE', label: 'NE' },
      { value: 'NH', label: 'NH' },
      { value: 'NJ', label: 'NJ' },
      { value: 'NM', label: 'NM' },
      { value: 'NV', label: 'NV' },
      { value: 'NY', label: 'NY' },
      { value: 'OH', label: 'OH' },
      { value: 'OK', label: 'OK' },
      { value: 'OR', label: 'OR' },
      { value: 'PA', label: 'PA' },
      { value: 'RI', label: 'RI' },
      { value: 'SC', label: 'SC' },
      { value: 'SD', label: 'SD' },
      { value: 'TN', label: 'TN' },
      { value: 'TX', label: 'TX' },
      { value: 'UT', label: 'UT' },
      { value: 'VA', label: 'VA' },
      { value: 'VT', label: 'VT' },
      { value: 'WA', label: 'WA' },
      { value: 'WI', label: 'WI' },
      { value: 'WV', label: 'WV' },
      { value: 'WY', label: 'WY' },
    ]);
  });
});
