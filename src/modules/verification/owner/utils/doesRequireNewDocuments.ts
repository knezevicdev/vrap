import { CalculateRequiredDocuments } from '../../shared/utils/calculateRequiredDocuments';

export const doesRequireNewDocuments = (
  initialRequiredDocuments: CalculateRequiredDocuments,
  requiredDocuments: CalculateRequiredDocuments
): boolean => {
  return (
    Object.keys(initialRequiredDocuments).filter(
      (key) =>
        !initialRequiredDocuments[key as keyof CalculateRequiredDocuments] &&
        requiredDocuments[key as keyof CalculateRequiredDocuments]
    ).length > 0
  );
};
