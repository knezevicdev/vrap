import getConfig from 'next/config';
import React from 'react';
const {
  publicRuntimeConfig: { BASE_PATH },
} = getConfig();

export class Icons {
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

  static readonly RED_ONE = new Icons('RED_ONE', {
    name: 'red-one',
    width: 16,
    height: 16,
    path: `${BASE_PATH}/icons/red-one.svg`,
  })

  private constructor(
    protected key: string,
    public readonly value: {
      name: string;
      width: number;
      height: number;
      color?: string;
      path?: string;
    }
  ) {}
}

interface Props {
  icon: Icons;
  color?: string;
  className?: string;
}

const Icon: React.FC<Props> = ({ icon, color, className }) => {
  const path = icon.value.path;
  const width = icon.value.width;
  const height = icon.value.height;
  const name = icon.value.name;
  const iconColor = icon.value.color ? icon.value.color : '#041022';
  const fill = color ? color : iconColor;
  const file = `${BASE_PATH}/icons/icons.svg`;
  const id = `#${name}`;
  const xlinkHref = `${file}${id}`;

  return (
    <>
      {path ? (
        <img className={className} width={width} height={height} src={path} />
      ) : (
        <svg
          className={className}
          fill={fill}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          <use xlinkHref={xlinkHref} />
        </svg>
      )}
    </>
  );
};

export default Icon;
