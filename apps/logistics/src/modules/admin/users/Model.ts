import { makeAutoObservable, runInAction } from 'mobx';

import { Carrier, User } from 'src/networking/models/User';
import { getUsers, Status } from 'src/networking/Networker';

class UsersModel {
  users: User[] = [];
  usersStatus: Status = Status.INITIAL;

  carrierFilter?: Carrier;
  statusFilter?: string;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async (): Promise<void> => {
    this.usersStatus = Status.FETCHING;

    try {
      const response = await getUsers(
        this.carrierFilter?.carrier_code ?? undefined,
        this.statusFilter
      );

      runInAction(() => {
        this.usersStatus = Status.SUCCESS;
        this.users = response.data;
      });
    } catch (err) {
      console.error(err);

      this.usersStatus = Status.ERROR;
    }
  };

  setCarrierFilter = (value: Carrier | undefined): void => {
    this.carrierFilter = value;
  };

  setStatusFilter = (value: string): void => {
    this.statusFilter = value;
  };
}

export default UsersModel;
