export interface DropdownProps {
    label: string;
    options: {
        value: string;
        label: string;
    }[];
    onSelectCallback: (value: string, label: string) => void;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
}
declare const Dropdown: {
    (props: DropdownProps): JSX.Element;
    defaultProps: {
        placeholder: string;
    };
};
export default Dropdown;
