import * as Yup from 'yup';

import { Validity } from './types';

const errorMessages = {
  email: 'Please enter a valid email address',
  firstName: 'Please enter a valid first name',
  lastName: 'Please enter a valid last name',
  phone: 'Please enter a valid phone number',
  password: 'Needs 8 characters, uppercase, numbers',
  passwordSize: 'Needs 8 characters',
  lowercase: 'Needs lowercase',
  uppercase: 'Needs uppercase',
  number: 'Needs numbers',
};

const regex = {
  name: /^[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞąćęłńóśźżĄĆĘŁŃÓŚŹŻàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ \-']+$/,
  lowercase: /^(?=.*[a-z]).+$/,
  uppercase: /^(?=.*[A-Z]).+$/,
  numbers: /^(?=.*[0-9]).+$/,
};

const firstNameValidation = Yup.string()
  .required(errorMessages.firstName)
  .matches(regex.name, errorMessages.firstName)
  .trim(errorMessages.firstName)
  .strict();

const lastNameValidation = Yup.string()
  .required(errorMessages.lastName)
  .matches(regex.name, errorMessages.lastName)
  .trim(errorMessages.lastName)
  .strict();

const emailValidation = Yup.string()
  .required(errorMessages.email)
  .email(errorMessages.email);

const phoneValidation = Yup.string()
  .required(errorMessages.phone)
  .min(14, errorMessages.phone)
  .max(14, errorMessages.phone);

export const passwordValidity = (password: string): Validity => {
  return {
    isAtLength: password.length >= 8,
    hasLowercase: regex.lowercase.test(password),
    hasUppercase: regex.uppercase.test(password),
    hasNumbers: regex.numbers.test(password),
  };
};

const getErrorMessage = (validity: Validity): string => {
  const { isAtLength, hasLowercase, hasUppercase, hasNumbers } = validity;
  const length = isAtLength ? '' : '8 characters';
  const lower = hasLowercase ? '' : 'lowercase';
  const upper = hasUppercase ? '' : 'uppercase';
  const number = hasNumbers ? '' : 'numbers';
  return new Yup.ValidationError(
    `Needs ${[length, lower, upper, number].filter((i) => i).join(', ')}`
  ).message;
};

const passwordValidation = Yup.string()
  .required(errorMessages.password)
  .test({
    name: 'password-validity',
    test: function (value) {
      const validity = passwordValidity(value || '');
      const errorMessage = getErrorMessage(validity);

      return Object.values(validity).every((item) => item)
        ? true
        : this.createError({
            message: errorMessage,
            path: 'password',
          });
    },
  });

const optInValidation = Yup.boolean();

export const ValidationSchema = Yup.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  username: emailValidation,
  phone: phoneValidation,
  password: passwordValidation,
  optIn: optInValidation,
});
