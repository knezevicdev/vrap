import React from 'react';
export interface BasePictureProps {
    alt: string;
    className?: string;
    objectFit?: string;
    objectPosition?: string;
    onClick?: (e: React.MouseEvent<HTMLPictureElement, MouseEvent>) => void;
    src: string;
}
export interface WidthHeightPictureProps extends BasePictureProps {
    width: string;
    height: string;
}
export interface WidthRatioPictureProps extends BasePictureProps {
    width: string;
    aspectRatio: string;
}
export declare type PictureProps = WidthRatioPictureProps | WidthHeightPictureProps;
export interface PictureState {
    intersecting: boolean;
    loaded: boolean;
}
export declare class Picture extends React.Component<PictureProps, PictureState> {
    private aspectRatioRegex;
    private onlyDigitsRegex;
    private floatToPercent;
    private percentToFloat;
    private getHeightFromWidthAndAspectRatio;
    private handleObserverChange;
    private handleImageLoad;
    constructor(props: PictureProps);
    render(): React.ReactNode;
}
