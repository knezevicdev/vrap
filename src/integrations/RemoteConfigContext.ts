import firebase from 'firebase/app';
import { createContext } from 'react';

export const RemoteConfigContext =
  createContext<firebase.remoteConfig.RemoteConfig>(
    {} as firebase.remoteConfig.RemoteConfig
  );
