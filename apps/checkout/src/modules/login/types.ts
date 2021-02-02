export interface FormProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface FormValues {
  username: string;
  password: string;
}

export interface ForgotPassword {
  href: string;
  text: string;
}

export interface LoginProps {
  isValid: boolean;
  forgotPassword: ForgotPassword;
  dirty: boolean;
}
