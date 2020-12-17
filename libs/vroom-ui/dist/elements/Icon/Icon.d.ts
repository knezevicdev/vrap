import React from 'react';
interface IconType {
    name: string;
    width: number;
    height: number;
    getPath: JSX.Element;
    fill?: string;
    stroke?: string;
}
interface Props {
    icon: IconType;
    fill?: string;
    stroke?: string;
    className?: string;
}
declare const Icon: React.FC<Props>;
export default Icon;
export declare const Icons: {
    [name: string]: IconType;
};
