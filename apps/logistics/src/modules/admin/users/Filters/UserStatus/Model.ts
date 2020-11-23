import { makeAutoObservable, runInAction } from 'mobx';

import { getUserStatuses, Status } from 'src/networking/Networker';

class UserStatusModel {
  value = '';
  options: string[] = [];
  status: Status = Status.INITIAL;
  constructor() {
    makeAutoObservable(this);
  }

  getUserStatuses = async (): Promise<void> => {
    this.status = Status.FETCHING;
    try {
      const response = await getUserStatuses();

      runInAction(() => {
        this.status = Status.SUCCESS;
        this.options = response.data;
      });
    } catch (err) {
      console.error(err);
      this.status = Status.ERROR;
    }
  };

  setValue(value: string): void {
    this.value = value;
  }
}

export default UserStatusModel;
