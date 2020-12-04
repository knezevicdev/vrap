import React from 'react';
import styled from 'styled-components';

import file from '../../../public/assets/icons.svg';

interface Icon {
  name: string;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
}

interface Props {
  icon: Icon;
  fill?: string;
  stroke?: string;
  className?: string;
}

const SVG = styled.svg<{ height: number; width: number }>`
  min-height: ${(props): number => props.height}px;
  max-height: ${(props): number => props.height}px;
  min-width: ${(props): number => props.width}px;
  max-width: ${(props): number => props.width}px;
`;

const Icon: React.FC<Props> = ({ icon, fill, stroke, className }) => {
  const width = icon.width;
  const height = icon.height;
  const name = icon.name;
  const iconDefaultFill = icon.fill ? icon.fill : '#041022';
  const iconFill = fill ? fill : iconDefaultFill;
  const iconDefaultStroke = icon.stroke ? icon.stroke : 'none';
  const iconStroke = stroke ? stroke : iconDefaultStroke;
  const id = `#${name}`;
  const xlinkHref = `${file}${id}`;

  return (
    <SVG
      className={className}
      fill={iconFill}
      stroke={iconStroke}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <use xlinkHref={xlinkHref} />
    </SVG>
  );
};

export default Icon;

export const Icons = {
  GAS: {
    name: 'gas',
    width: 24,
    height: 24,
  },
  ENGINE: {
    name: 'engine',
    width: 24,
    height: 24,
  },
  SEAT: {
    name: 'seat',
    width: 24,
    height: 24,
  },
  VROOM: {
    name: 'vroom',
    width: 116,
    height: 20,
    fill: '#E7131A',
  },
  GOOGLE_PLAY: {
    name: 'google-play',
    width: 108,
    height: 32,
  },
  APPLE_STORE: {
    name: 'apple-store',
    width: 96,
    height: 32,
  },
  FACEBOOK: {
    name: 'facebook',
    width: 24,
    height: 24,
  },
  TWITTER: {
    name: 'twitter',
    width: 24,
    height: 24,
  },
  INSTAGRAM: {
    name: 'instagram',
    width: 24,
    height: 24,
  },
  CHEVRON_DOWN: {
    name: 'chevron-down',
    width: 12,
    height: 8,
  },
  CHEVRON_UP: {
    name: 'chevron-up',
    width: 12,
    height: 8,
  },
  CLOSE_SMALL: {
    name: 'close-small',
    width: 8,
    height: 8,
  },
  CLOSE_LARGE: {
    name: 'close-large',
    width: 12,
    height: 12,
  },
  MINUS: {
    name: 'minus',
    width: 16,
    height: 2,
  },
  PLUS: {
    name: 'plus',
    width: 16,
    height: 16,
  },
  BULLET: {
    name: 'bullet',
    width: 6,
    height: 6,
    fill: '#E7131A',
  },
  LOADING: {
    name: 'loading',
    width: 16,
    height: 16,
  },
  CARET_LEFT: {
    name: 'caret-left',
    width: 10,
    height: 16,
  },
  CARET_RIGHT: {
    name: 'caret-right',
    width: 10,
    height: 16,
  },
  CARET_DOUBLE_LEFT: {
    name: 'caret-double-left',
    width: 20,
    height: 16,
  },
  CARET_DOUBLE_RIGHT: {
    name: 'caret-double-right',
    width: 20,
    height: 16,
  },
  ARROW_LEFT: {
    name: 'arrow-left',
    width: 16,
    height: 16,
  },
  ARROW_RIGHT: {
    name: 'arrow-right',
    width: 16,
    height: 16,
  },
  IMAGE_EXPAND: {
    name: 'image-expand',
    width: 16,
    height: 16,
  },
  IMAGE_CONTRACT: {
    name: 'image-contract',
    width: 16,
    height: 16,
  },
  CHECKMARK_LARGE: {
    name: 'checkmark-large',
    width: 16,
    height: 12,
  },
  CHECKMARK_SMALL: {
    name: 'checkmark-small',
    width: 12,
    height: 9,
  },
  STAR_FILLED: {
    name: 'star',
    width: 16,
    height: 14,
    fill: '#E7131A',
  },
  STAR_HALF_FILLED: {
    name: 'star-half',
    width: 16,
    height: 14,
    fill: '#E7131A',
    stroke: 'none',
  },
  STAR_EMPTY: {
    name: 'star-empty',
    width: 16,
    height: 14,
    fill: 'none',
    stroke: '#E7131A',
  },
  FAVORITE: {
    name: 'favorite',
    width: 18,
    height: 16,
    fill: '#041022',
  },
  FAVORITE_SELECTED: {
    name: 'favorite-selected',
    width: 18,
    height: 16,
    fill: '#E7131A',
  },
  SEARCH: {
    name: 'search',
    width: 18,
    height: 18,
  },
  MENU: {
    name: 'menu',
    width: 18,
    height: 16,
  },
  SORT: {
    name: 'sort',
    width: 18,
    height: 20,
  },
  FILTER: {
    name: 'filter',
    width: 20,
    height: 14,
  },
  CART_EMPTY: {
    name: 'cart-empty',
    width: 20,
    height: 18,
  },
  CART_FILLED: {
    name: 'cart-filled',
    width: 20,
    height: 18,
  },
  EDIT: {
    name: 'edit',
    width: 14,
    height: 16,
  },
  LOGIN: {
    name: 'login',
    width: 24,
    height: 24,
  },
  EXIT: {
    name: 'exit',
    width: 20,
    height: 16,
  },
  LOCK: {
    name: 'lock',
    width: 16,
    height: 17,
  },
  FEEDBACK_INFO: {
    name: 'feedback-info',
    width: 16,
    height: 16,
    fill: '#E7131A',
  },
  FEEDBACK_ERROR: {
    name: 'feedback-error',
    width: 16,
    height: 16,
    fill: '#F26900',
  },
  FEEDBACK_QUESTION: {
    name: 'feedback-question',
    width: 16,
    height: 16,
    fill: '#E7131A',
  },
  FEEDBACK_SUCCESS: {
    name: 'feedback-success',
    width: 16,
    height: 16,
    fill: '#308406',
  },
  PHONE: {
    name: 'phone',
    width: 22,
    height: 20,
  },
  HOT: {
    name: 'hot',
    width: 10,
    height: 12,
  },
  QUESTION: {
    name: 'question',
    width: 14,
    height: 22,
  },
  ENVELOPE: {
    name: 'envelope',
    width: 24,
    height: 14,
  },
};
