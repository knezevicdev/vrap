import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

import { Status } from 'src/networking/Networker';

export interface Model<RESPONSE, PROPS, STORE> {
  response?: RESPONSE;
  props: PROPS;
  store?: STORE;
  status: Status;
}

interface MvvmProps<RESPONSE, PROPS, STORE, VIEWPROPS> {
  model?: {
    onload?: (props?: PROPS) => Promise<AxiosResponse<RESPONSE>>;
    consumer?: React.Context<STORE>;
    provider?: React.Context<RESPONSE>;
  };
  viewModel?: (model: Model<RESPONSE, PROPS, STORE>) => VIEWPROPS;
  View: React.FC<VIEWPROPS>;
}

const mvvm = <RESPONSE, PROPS, STORE, VIEWPROPS>({
  model: { onload, consumer, provider } = {},
  viewModel,
  View,
}: MvvmProps<RESPONSE, PROPS, STORE, VIEWPROPS>): React.FC<PROPS> => {
  const MVVM: React.FC<PROPS> = (props: PROPS) => {
    const [response, setResponse] = useState<RESPONSE>();
    const [status, setStatus] = useState(Status.INITIAL);

    useEffect(() => {
      const fetch = (api: () => Promise<AxiosResponse<RESPONSE>>): void => {
        try {
          setStatus(Status.FETCHING);
          api().then((response) => {
            setResponse(response.data);
            setStatus(Status.SUCCESS);
          });
        } catch (err) {
          console.error(err);
          setStatus(Status.ERROR);
        }
      };

      if (onload) {
        fetch(() => onload(props));
      }
    }, []);

    if (!viewModel) {
      return <View {...({} as any)} />;
    }

    const view = consumer ? (
      <consumer.Consumer>
        {(store: STORE): JSX.Element => (
          <View
            {...viewModel({
              response,
              props,
              status,
              store,
            })}
          />
        )}
      </consumer.Consumer>
    ) : (
      <View
        {...viewModel({
          response,
          props,
          status,
          store: undefined,
        })}
      />
    );

    return provider && response ? (
      <provider.Provider value={response}>{view}</provider.Provider>
    ) : (
      view
    );
  };

  return MVVM;
};

export default mvvm;
