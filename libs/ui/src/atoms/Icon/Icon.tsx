import React from 'react';

import IconsSheet from '../../../static/icons/icons.svg';

export class Icons {
  static readonly GAS = new Icons('GAS', {
    name: 'gas',
    width: 24,
    height: 24,
  });

  static readonly ENGINE = new Icons('ENGINE', {
    name: 'engine',
    width: 24,
    height: 24,
  });

  static readonly SEAT = new Icons('SEAT', {
    name: 'seat',
    width: 24,
    height: 24,
  });

  static readonly CHECKMARK = new Icons('CHECKMARK', {
    name: 'checkmark',
    width: 12,
    height: 9,
  });

  static readonly VROOM = new Icons('VROOM', {
    name: 'vroom',
    width: 116,
    height: 20,
    color: '#E7131A',
  });

  static readonly GOOGLE_PLAY = new Icons('GOOGLE_PLAY', {
    name: 'google-play',
    width: 108,
    height: 32,
  });

  static readonly APPLE_STORE = new Icons('APPLE_STORE', {
    name: 'apple-store',
    width: 96,
    height: 32,
  });

  static readonly FACEBOOK = new Icons('FACEBOOK', {
    name: 'facebook',
    width: 24,
    height: 24,
    color: '#FFFFFF',
  });

  static readonly TWITTER = new Icons('TWITTER', {
    name: 'twitter',
    width: 24,
    height: 24,
    color: '#FFFFFF',
  });

  static readonly INSTAGRAM = new Icons('INSTAGRAM', {
    name: 'instagram',
    width: 24,
    height: 24,
    color: '#FFFFFF',
  });

  static readonly ARROW_DOWN = new Icons('ARROW_DOWN', {
    name: 'arrow-down',
    width: 24,
    height: 24,
    color: '#FFFFFF',
  });

  private constructor(
    protected key: string,
    public readonly value: {
      name: string;
      width: number;
      height: number;
      color?: string;
    }
  ) {}
}

interface Props {
  icon: Icons;
  color?: string;
  className?: string;
}

const Icon: React.FC<Props> = ({ icon, color, className }) => {
  const width = icon.value.width;
  const height = icon.value.height;
  const name = icon.value.name;
  const iconColor = icon.value.color ? icon.value.color : '#041022';
  const fill = color ? color : iconColor;

  return (
    <svg
      className={className}
      fill={fill}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      <use href={`${IconsSheet}#${name}`} />
    </svg>
  );
};

export default Icon;
