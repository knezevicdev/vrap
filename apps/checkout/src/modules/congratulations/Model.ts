import { 
  GQLTypes,
  isErrorResponse,
  Status,
} from '@vroom-web/networking';
import { makeAutoObservable, runInAction } from 'mobx';
import { getCongratsData  } from "src/networking";
interface Data {
  user: GQLTypes.User;
}

export default class CongratsModel { 
  data: Data = {} as Data;
  dataStatus: Status = Status.LOADING;

  constructor() { 
    makeAutoObservable(this);
  }

  async getData(dealID?: number): Promise<void> {
    this.dataStatus = Status.LOADING;
  
    const response = await getCongratsData(dealID, ['Pending']);
 
    if (isErrorResponse(response)) { 
      runInAction(() => {
        this.dataStatus = Status.ERROR;
      });
      console.log('ERROR', response);
      return;
    }

    runInAction(() => {
      this.data = response.data;
      this.dataStatus = Status.SUCCESS;
    });
  }
}
