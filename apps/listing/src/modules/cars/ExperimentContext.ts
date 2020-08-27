import { ParsedUrlQuery } from 'querystring';
import { createContext } from 'react';
import { Experiment } from 'vroom-abtesting-sdk/types';

interface Props {
  experiments: Experiment[];
  query: ParsedUrlQuery;
}

export class ExperimentData {
  readonly experiments: Experiment[] | undefined;
  readonly query: ParsedUrlQuery | undefined;
  constructor(initProps?: Props) {
    this.experiments = initProps?.experiments;
    this.query = initProps?.query;
  }
}

export const ExperimentContext = createContext<ExperimentData>(
  new ExperimentData()
);
