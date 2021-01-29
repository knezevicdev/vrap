import {
  Client,
  GQLTypes,
  isErrorResponse,
  Status,
} from '@vroom-web/networking';
import { makeAutoObservable, runInAction } from 'mobx';
import GET_USER_DEAL from '../../graphql/queries/getUserDeal.graphql';
interface Data {
  user: GQLTypes.User;
}

export default class CongratsModel {
  client: Client;
  data: Data = {} as Data;
  dataStatus: Status = Status.LOADING;

  constructor(client: Client) {
    this.client = client;
    makeAutoObservable(this);
  }

  async getData(dealID?: number): Promise<void> {
    this.dataStatus = Status.LOADING;

    const res = await this.client.gqlRequest<Data, GQLTypes.UserDealsArgs>({
      document: GET_USER_DEAL,
      variables: {
        dealID,
        dealStatus: ['Pending'],
      },
    });

    if (isErrorResponse(res)) {
      runInAction(() => {
        this.dataStatus = Status.ERROR;
      });
      console.log('ERROR', res);
      return;
    }

    runInAction(() => {
      this.data = res.data;
      this.dataStatus = Status.SUCCESS;
    });
  }
}
