import { styled } from '@material-ui/core';
import { Coords } from 'google-map-react';
import getConfig from 'next/config';
import React, { FC } from 'react';

const { publicRuntimeConfig } = getConfig();

const SizedIcon = styled('img')(() => ({
  width: '32px',
  height: '32px',
}));

const MarkerIcon: FC<Coords> = () => {
  return (
    <SizedIcon
      src={`${publicRuntimeConfig.BASE_PATH}/modules/home/images/map-pin.svg`}
      alt="pin icon"
    />
  );
};

export default MarkerIcon;
