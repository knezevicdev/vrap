import React from 'react';
export interface ButtonProps {
    className?: string;
    children: string;
    onClick: () => void;
    disabled?: boolean;
}
export declare class Button {
    static Primary: React.FC<ButtonProps>;
    static Secondary: React.FC<ButtonProps>;
    static Bare: React.FC<ButtonProps>;
    static Outline: React.FC<ButtonProps>;
}
