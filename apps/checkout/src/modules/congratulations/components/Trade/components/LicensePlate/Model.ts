import {
  Client,
  GQLTypes,
  isErrorResponse,
  Status,
} from '@vroom-web/networking';
import gql from 'graphql-tag';
import { action, makeObservable, observable, runInAction } from 'mobx';

interface Data {
  licensePlateToVin: GQLTypes.LpToVin;
}

export default class LicensePlateModel {
  client: Client;
  data: Data = {} as Data;
  dataStatus: Status = Status.INITIAL;

  constructor(client: Client) {
    this.client = client;
    makeObservable(this, {
      dataStatus: observable,
      data: observable,
      getData: action,
    });
  }

  async getData(lp: string, state: string): Promise<void> {
    this.dataStatus = Status.LOADING;

    const document = gql`
      query($lp: String!, $state: String!, $source: String!) {
        licensePlateToVin(lp: $lp, state: $state, source: $source) {
          vehicles {
            modelYear
            make
            vin
          }
        }
      }
    `;

    const res = await this.client.gqlRequest<
      Data,
      GQLTypes.QueryLicensePlateToVinArgs
    >({
      document,
      variables: {
        lp: lp,
        state: state,
        source: 'vroom.com',
      },
    });

    if (isErrorResponse(res)) {
      runInAction(() => {
        this.dataStatus = Status.ERROR;
      });
      return;
    }

    runInAction(() => {
      this.data = res.data;
      this.dataStatus = Status.SUCCESS;
    });
  }
}
