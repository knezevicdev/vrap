import { isEmpty } from 'lodash';

import { Verification } from 'src/networking/models/Price';

export interface CalculateRequiredDocuments {
  secondDriverLicense: boolean;
  titleInfo: boolean;
  lienInfo: boolean;
}

const calculateRequiredDocuments = (
  verification: Partial<Verification> | undefined,
  state: string
): CalculateRequiredDocuments => {
  const requiredStatesForTitles = [
    'KY',
    'MD',
    'MI',
    'MO',
    'MN',
    'MT',
    'NY',
    'OK',
    'WY',
  ];

  return {
    secondDriverLicense: !isEmpty(verification?.second_owner_first_name),
    titleInfo:
      verification?.current_payments === false ||
      requiredStatesForTitles.includes(state),
    lienInfo: !!verification?.current_payments,
  };
};

export default calculateRequiredDocuments;
