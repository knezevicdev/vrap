import React from 'react';

import ENVS from 'src/integrations/Envs';

export class Icons {
  static readonly EMAIL = new Icons('Email', {
    name: 'email',
    width: 24,
    height: 24,
    path: `${ENVS.BASE_PATH}/icons/email.svg`,
  });

  static readonly FAQ = new Icons('Faq', {
    name: 'faq',
    width: 24,
    height: 24,
    path: `${ENVS.BASE_PATH}/icons/faq.svg`,
  });

  static readonly PHONE = new Icons('Phone', {
    name: 'phone',
    width: 24,
    height: 24,
    path: `${ENVS.BASE_PATH}/icons/phone.svg`,
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

  static readonly CAR_OFFER = new Icons('CAR_OFFER', {
    name: 'car-offer',
    width: 90,
    height: 90,
    path: `${ENVS.BASE_PATH}/icons/car-offer.svg`,
  });

  static readonly RED_ONE = new Icons('RED_ONE', {
    name: 'red-one',
    width: 16,
    height: 16,
    path: `${ENVS.BASE_PATH}/icons/red-one.svg`,
  });

  static readonly CHECK_MARK_RED = new Icons('CHECK_MARK_RED', {
    name: 'check-mark-red',
    width: 16,
    height: 16,
    path: `${ENVS.BASE_PATH}/icons/check-mark-red.svg`,
  });

  static readonly CHECK_MARK_WHITE = new Icons('CHECK_MARK_WHITE', {
    name: 'check-mark-white',
    width: 16,
    height: 16,
    path: `${ENVS.BASE_PATH}/icons/check-mark-white.svg`,
  });

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
  const file = `${ENVS.BASE_PATH}/icons/icons.svg`;
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
