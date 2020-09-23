import React from 'react';
export declare class Icons {
    protected key: string;
    readonly value: {
        name: string;
        width: number;
        height: number;
        color?: string;
    };
    static readonly GAS: Icons;
    static readonly ENGINE: Icons;
    static readonly SEAT: Icons;
    static readonly CHECKMARK: Icons;
    static readonly VROOM: Icons;
    static readonly GOOGLE_PLAY: Icons;
    static readonly APPLE_STORE: Icons;
    static readonly FACEBOOK: Icons;
    static readonly TWITTER: Icons;
    static readonly INSTAGRAM: Icons;
    static readonly ARROW_DOWN: Icons;
    private constructor();
}
interface Props {
    icon: Icons;
    color?: string;
    className?: string;
}
declare const Icon: React.FC<Props>;
export default Icon;
