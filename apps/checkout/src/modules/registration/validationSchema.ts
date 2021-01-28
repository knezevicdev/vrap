import * as Yup from 'yup';

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
  .matches(name, errorMessages.firstName)
  .trim(errorMessages.firstName)
  .strict();

const lastNameValidation = Yup.string()
  .required(errorMessages.lastName)
  .matches(name, errorMessages.lastName)
  .trim(errorMessages.lastName)
  .strict();

const emailValidation = Yup.string()
  .required(errorMessages.email)
  .email(errorMessages.email);

const phoneValidation = Yup.string()
  .required(errorMessages.phone)
  .min(14, errorMessages.phone)
  .max(14, errorMessages.phone);

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

const optInValidation = Yup.boolean();

export const ValidationSchema = Yup.object({
  firstName: firstNameValidation,
  lastName: lastNameValidation,
  username: emailValidation,
  phone: phoneValidation,
  password: passwordValidation,
  optIn: optInValidation,
});
