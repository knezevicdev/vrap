import { makeAutoObservable, runInAction } from 'mobx';

import { User } from 'src/networking/models/User';
import { getUsers, Status } from 'src/networking/Networker';

class UsersModel {
  users: User[] = [];
  usersStatus: Status = Status.INITIAL;

  carrierCode?: string;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async (status?: string): Promise<void> => {
    this.usersStatus = Status.FETCHING;

    try {
      const response = await getUsers(this.carrierCode, status);

      runInAction(() => {
        this.usersStatus = Status.SUCCESS;
        this.users = response.data;
      });
    } catch (err) {
      console.error(err);

      this.usersStatus = Status.ERROR;
    }
  };

  setCarrierCode = (value: string): void => {
    this.carrierCode = value;
  };
}

export default UsersModel;
