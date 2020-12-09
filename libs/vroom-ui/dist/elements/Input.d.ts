export interface InputProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    className?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    success?: boolean;
}
declare const Input: {
    (props: InputProps): JSX.Element;
    defaultProps: {
        placeholder: string;
    };
};
export default Input;
