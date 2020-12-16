import React from 'react';
interface Icon {
    name: string;
    width: number;
    height: number;
    getPath: () => JSX.Element;
    fill?: string;
    stroke?: string;
}
interface Props {
    icon: Icon;
    fill?: string;
    stroke?: string;
    className?: string;
}
declare const Icon: React.FC<Props>;
export default Icon;
export declare const Icons: {
    GAS: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    ENGINE: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    SEAT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    VROOM: {
        name: string;
        width: number;
        height: number;
        fill: string;
        getPath: () => JSX.Element;
    };
    GOOGLE_PLAY: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    APPLE_STORE: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    FACEBOOK: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    TWITTER: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    INSTAGRAM: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CHEVRON_DOWN: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CHEVRON_UP: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CLOSE_SMALL: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CLOSE_LARGE: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    MINUS: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    PLUS: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    BULLET: {
        name: string;
        width: number;
        height: number;
        fill: string;
        getPath: () => JSX.Element;
    };
    LOADING: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CARET_LEFT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CARET_RIGHT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CARET_DOUBLE_LEFT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CARET_DOUBLE_RIGHT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    ARROW_LEFT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    ARROW_RIGHT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    IMAGE_EXPAND: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    IMAGE_CONTRACT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CHECKMARK_LARGE: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CHECKMARK_SMALL: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    STAR_FILLED: {
        name: string;
        width: number;
        height: number;
        fill: string;
        getPath: () => JSX.Element;
    };
    STAR_HALF_FILLED: {
        name: string;
        width: number;
        height: number;
        fill: string;
        stroke: string;
        getPath: () => JSX.Element;
    };
    STAR_EMPTY: {
        name: string;
        width: number;
        height: number;
        fill: string;
        stroke: string;
        getPath: () => JSX.Element;
    };
    FAVORITE: {
        name: string;
        width: number;
        height: number;
        fill: string;
        getPath: () => JSX.Element;
    };
    FAVORITE_SELECTED: {
        name: string;
        width: number;
        height: number;
        fill: string;
        getPath: () => JSX.Element;
    };
    SEARCH: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    MENU: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    SORT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    FILTER: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CART_EMPTY: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CART_FILLED: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    EDIT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    LOGIN: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    EXIT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    LOCK: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    FEEDBACK_INFO: {
        name: string;
        width: number;
        height: number;
        fill: string;
        getPath: () => JSX.Element;
    };
    FEEDBACK_ERROR: {
        name: string;
        width: number;
        height: number;
        fill: string;
        getPath: () => JSX.Element;
    };
    FEEDBACK_QUESTION: {
        name: string;
        width: number;
        height: number;
        fill: string;
        getPath: () => JSX.Element;
    };
    FEEDBACK_SUCCESS: {
        name: string;
        width: number;
        height: number;
        fill: string;
        getPath: () => JSX.Element;
    };
    PHONE: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    HOT: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    QUESTION: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    ENVELOPE: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
    CALENDAR: {
        name: string;
        width: number;
        height: number;
        getPath: () => JSX.Element;
    };
};
