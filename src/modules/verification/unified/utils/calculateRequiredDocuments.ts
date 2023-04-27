import { VerificationState } from '../store/store';

export interface RequiredDocuments {
  firstDriverLicenseBack: boolean;
  secondDriverLicense: boolean;
  secondDriverLicenseBack: boolean;
  titleInfo: boolean;
  lienInfo: boolean;
}

const calculateRequiredDocuments = ({
  loanConfirmation,
  loanState,
  secondOwnerConfirmation,
  firstOwnerState,
  secondOwnerState,
}: Pick<
  VerificationState,
  | 'loanConfirmation'
  | 'secondOwnerConfirmation'
  | 'loanState'
  | 'firstOwnerState'
  | 'secondOwnerState'
>): RequiredDocuments => {
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

  const hasNoActiveLoan = loanConfirmation === 'No';
  const hasSecondOwner = secondOwnerConfirmation === 'Yes';

  return {
    firstDriverLicenseBack: firstOwnerState === 'NJ',
    secondDriverLicense: hasSecondOwner,
    secondDriverLicenseBack: hasSecondOwner && secondOwnerState === 'NJ',
    titleInfo: hasNoActiveLoan || requiredStatesForTitles.includes(loanState),
    lienInfo: hasNoActiveLoan,
  };
};

export default calculateRequiredDocuments;
