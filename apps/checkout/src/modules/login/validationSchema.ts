import * as Yup from 'yup';

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Please enter a valid password',
};

const emailValidation = Yup.string()
  .required(errorMessages.email)
  .email(errorMessages.email);

const passwordValidation = Yup.string()
  .required(errorMessages.password)
  .min(8, errorMessages.password);

export const ValidationSchema = Yup.object({
  username: emailValidation,
  password: passwordValidation,
});
