import { isEmpty } from 'lodash';

import { Verification } from 'src/networking/models/Price';

export interface CalculateRequiredDocuments {
  firstDriverLicenseBack: boolean;
  secondDriverLicense: boolean;
  secondDriverLicenseBack: boolean;
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
    'MO',
    'MN',
    'MT',
    'NY',
    'OK',
    'WY',
  ];

  const hasSecondOwner = !isEmpty(verification?.second_owner_first_name);

  return {
    firstDriverLicenseBack: verification?.owner_mailing_address?.state === 'NJ',
    secondDriverLicense: hasSecondOwner,
    secondDriverLicenseBack:
      hasSecondOwner &&
      verification?.second_owner_mailing_address?.state === 'NJ',
    titleInfo:
      verification?.current_payments === false ||
      requiredStatesForTitles.includes(state),
    lienInfo: !verification?.current_payments,
  };
};

export default calculateRequiredDocuments;
