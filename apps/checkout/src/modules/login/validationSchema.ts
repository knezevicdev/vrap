import * as Yup from 'yup';

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Needs 8 characters, uppercase, numbers',
  passwordSize: 'Needs 8 characters',
  lowercase: 'Needs lowercase',
  uppercase: 'Needs uppercase',
  number: 'Needs numbers',
};

const regex = {
  lowercase: /^(?=.*[a-z]).+$/,
  uppercase: /^(?=.*[A-Z]).+$/,
  numbers: /^(?=.*[0-9]).+$/,
};

const emailValidation = Yup.string()
  .required(errorMessages.email)
  .email(errorMessages.email);

const passwordValidation = Yup.string()
  .required(errorMessages.password)
  .min(8, errorMessages.passwordSize)
  .test('has-lowercase', errorMessages.lowercase, (value) =>
    value ? regex.lowercase.test(value) : false
  )
  .test('has-uppercase', errorMessages.uppercase, (value) =>
    value ? regex.uppercase.test(value) : false
  )
  .test('has-numbers', errorMessages.number, (value) =>
    value ? regex.numbers.test(value) : false
  );

export const ValidationSchema = Yup.object({
  username: emailValidation,
  password: passwordValidation
});
