import { observer } from 'mobx-react';
import React from 'react';

import Loading from './Loading';

import { AsyncStatus, Store } from 'src/interfaces.d';

const AsyncIndicator: React.FC<{ store: Store }> = ({ store }) => {
  const isFetching = store.asyncStatus === AsyncStatus.Fetching;
  if (!isFetching) return null;

  return <Loading />;
};

export default observer(AsyncIndicator);
