import React from 'react';

import Loading from './Loading';

import { AsyncStatus } from 'src/interfaces.d';

const AsyncIndicator: React.FC<{ status: AsyncStatus }> = ({ status }) => {
  const isFetching = status === AsyncStatus.Fetching;
  if (!isFetching) return null;

  return <Loading />;
};

export default AsyncIndicator;
