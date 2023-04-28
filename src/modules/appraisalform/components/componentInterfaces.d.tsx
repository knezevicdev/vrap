export interface GenericObject {
  [key: string]: any;
}

export interface FormField {
  onChange: (event: GenericObject) => void;
  isRequired?: boolean;
  id?: string;
  forceValidate?: boolean;
  element?: HTMLElement;
  value: any; // => this is an example of a real any type
  error?: boolean;
  errorMessage?: string;
  onBlur?: (event: GenericObject) => void;
  onKeyPress?: (event: GenericObject) => void;
  disabled?: boolean;
  type?: string;
  customOptions?: GenericObject[];
  defaultLabel?: string;
  options?: GenericObject[];
  label?: string;
  tooltipText?: string;
  lenderId?: string;
}

export interface UseForm {
  fields: Record<string, FormField>;
  isFormValid: boolean;
  setFormFields: (value: GenericObject) => void;
  updateMultipleFields: (fields: GenericObject) => void;
  resetForm: () => void;
}
