import { VerificationState } from '../store/store';

export interface RequiredDocuments {
  secondDriverLicense: boolean;
  titleInfo: boolean;
  lienInfo: boolean;
}

const calculateRequiredDocuments = ({
  loanConfirmation,
  loanState,
  secondOwnerConfirmation,
}: Pick<
  VerificationState,
  'loanConfirmation' | 'secondOwnerConfirmation' | 'loanState'
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

  return {
    secondDriverLicense: secondOwnerConfirmation === 'Yes',
    titleInfo: hasNoActiveLoan || requiredStatesForTitles.includes(loanState),
    lienInfo: hasNoActiveLoan,
  };
};

export default calculateRequiredDocuments;
