import React from 'react';
export interface ButtonProps {
    className?: string;
    children: string;
    onClick: () => void;
    disabled?: boolean;
}
export declare const Button: {
    Primary: React.FC<ButtonProps>;
    Secondary: React.FC<ButtonProps>;
    Bare: React.FC<ButtonProps>;
    Outline: React.FC<ButtonProps>;
};
