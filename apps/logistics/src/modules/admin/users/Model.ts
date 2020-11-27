import { makeAutoObservable, runInAction } from 'mobx';

import { User } from 'src/networking/models/User';
import { Networker, Status } from 'src/networking/Networker';

export class UsersModel {
  users: User[] = [];
  usersStatus: Status = Status.INITIAL;

  private networker: Networker;

  constructor() {
    this.networker = new Networker();
    makeAutoObservable<this, 'networker'>(this, { networker: false });
  }

  getUsers = async (carrier?: string, status?: string): Promise<void> => {
    this.usersStatus = Status.FETCHING;

    try {
      const response = await this.networker.getUsers(carrier, status);

      runInAction(() => {
        this.usersStatus = Status.SUCCESS;
        this.users = response.data;
      });
    } catch (err) {
      console.error(err);

      this.usersStatus = Status.ERROR;
    }
  };
}

export default UsersModel;
