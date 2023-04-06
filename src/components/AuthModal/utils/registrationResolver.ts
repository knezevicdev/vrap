import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { isEmailDomainInvalid, isInvalidEmailTld } from './domains';

export interface Validity {
  isAtLength: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
}

const nameRegex =
  /^[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞąčćęłńóśšźżžĄČĆĘŁŃÓŚŠŹŻŽàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ \-']+$/;

const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required('Please enter a valid first name')
      .matches(nameRegex, 'Please enter a valid first name')
      .trim('Please enter a valid first name')
      .strict(),
    lastName: yup
      .string()
      .required('Please enter a valid last name')
      .matches(nameRegex, 'Please enter a valid last name')
      .trim('Please enter a valid last name')
      .strict(),
    email: yup
      .string()
      .required('Please enter a valid email address')
      .email('Please enter a valid email address')
      .test('DomainValidation', (email, ctx) => {
        if (!email) return false;
        const { isInvalid, intendedAddress } = isEmailDomainInvalid(email);
        if (isInvalid) {
          return ctx.createError({
            message: `Please enter a valid email address ${
              intendedAddress && `. Did you mean ${intendedAddress}?`
            }`,
            path: 'email',
          });
        }
        const isInvalidTld = isInvalidEmailTld(email);
        if (isInvalidTld) {
          return ctx.createError({
            message: 'Please enter a valid email address',
            path: 'email',
          });
        }
        return true;
      })
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email address'
      ),
    phoneNumber: yup
      .string()
      .required('Please enter a valid phone number')
      .matches(
        /^[2-9]?[ ]?\((\d{3})\)[- ]?(\d{3})[- ]?(\d{4})$/,
        'Please enter a valid phone number'
      )
      .min(14, 'Please enter a valid phone number')
      .max(16, 'Please enter a valid phone number'),
    password: yup
      .string()
      .required('Please enter a valid password')
      .test({
        name: 'password-validity',
        test: function (value) {
          const regex = {
            lowercase: /^(?=.*[a-z]).+$/,
            uppercase: /^(?=.*[A-Z]).+$/,
            numbers: /^(?=.*[0-9]).+$/,
          };

          const getErrorMessage = (validity: Validity): string => {
            const { isAtLength, hasLowercase, hasUppercase, hasNumbers } =
              validity;
            const validationErrors = [];
            if (!isAtLength) validationErrors.push('8 characters');
            if (!hasLowercase) validationErrors.push('lowercase');
            if (!hasUppercase) validationErrors.push('uppercase');
            if (!hasNumbers) validationErrors.push('numbers');
            return new yup.ValidationError(
              `Needs ${validationErrors.join(', ')}`
            ).message;
          };

          const passwordValidity = (password: string): Validity => {
            return {
              isAtLength: password.length >= 8,
              hasLowercase: regex.lowercase.test(password),
              hasUppercase: regex.uppercase.test(password),
              hasNumbers: regex.numbers.test(password),
            };
          };

          const validity = passwordValidity(value || '');
          const errorMessage = getErrorMessage(validity);

          return Object.values(validity).every((item) => item)
            ? true
            : this.createError({
                message: errorMessage,
                path: 'password',
              });
        },
      }),
    passwordConfirmation: yup
      .string()
      .required('Passwords do not match')
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  })
  .required();

export default yupResolver(schema);
