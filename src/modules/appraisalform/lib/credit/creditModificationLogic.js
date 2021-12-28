// TODO: used outside of credit - should think about moving and renaming
const EMPLOYER = 'employer';
const JOB_TITLE = 'jobTitle';
const MONTHS_EMPLOYED = 'monthsEmployed';
const YEARS_EMPLOYED = 'yearsEmployed';
const INCOME_FIELD = 'income';
const EMPLOYER_PHONE = 'employerPhone';
const NOT_APPLICABLE_FIELDS = [INCOME_FIELD];
const EMPLOYMENT_FIELDS = [
  EMPLOYER,
  JOB_TITLE,
  MONTHS_EMPLOYED,
  YEARS_EMPLOYED,
  INCOME_FIELD,
  EMPLOYER_PHONE,
];

export const notApplicableClearFields = EMPLOYMENT_FIELDS.filter(
  (field) => !NOT_APPLICABLE_FIELDS.includes(field)
);

// when some fields update, other fields need to update (eg. clearing)
export function getModifications(field, value) {
  const lastUnderscore = field.lastIndexOf('_');
  const prefix = field.substring(0, lastUnderscore + 1);
  const unprefixedField = field.substring(lastUnderscore + 1);
  const unprefixedFieldsToClear = [];

  if (unprefixedField === 'employmentStatus') {
    switch (value) {
      case 'Retired':
        unprefixedFieldsToClear.push(...EMPLOYMENT_FIELDS);
        break;
      case 'Not Applicable':
        unprefixedFieldsToClear.push(...notApplicableClearFields);
        break;
    }
  }

  const newState = unprefixedFieldsToClear.reduce(
    (accum, suffix) =>
      Object.assign(accum, { [`${prefix}${suffix}`]: undefined }),
    {}
  );

  return newState;
}
