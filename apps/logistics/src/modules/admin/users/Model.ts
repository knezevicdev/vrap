import { makeAutoObservable, runInAction } from 'mobx';

import {
  Carrier,
  Status as UserStatus,
  User,
} from 'src/networking/models/User';
import {
  getUsers,
  getUserStatuses,
  patchUser,
  Status,
} from 'src/networking/Networker';

class UsersModel {
  users: User[] = [];
  usersStatus: Status = Status.INITIAL;

  carrierFilter?: Carrier;
  statusFilter = UserStatus.Pending;
  statusOptions: string[] = [];
  statusOptionsStatus: Status = Status.INITIAL;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async (): Promise<void> => {
    this.usersStatus = Status.FETCHING;

    try {
      const response = await getUsers(
        this.carrierFilter?.carrier_code ?? '',
        this.statusFilter
      );

      runInAction(() => {
        this.usersStatus = Status.SUCCESS;
        this.users = response.data.users;
      });
    } catch (err) {
      console.error(err);

      this.usersStatus = Status.ERROR;
    }
  };

  patchUser = async (
    id: number,
    status?: string,
    carrierCode?: string
  ): Promise<void> => {
    try {
      await patchUser(id, status, carrierCode);
      this.getUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // statuses to assign to / filter a user
  getUserStatuses = async (): Promise<void> => {
    this.statusOptionsStatus = Status.FETCHING;
    try {
      const response = await getUserStatuses();

      runInAction(() => {
        this.statusOptionsStatus = Status.SUCCESS;
        this.statusOptions = response.data.values;
      });
    } catch (err) {
      console.error(err);
      this.statusOptionsStatus = Status.ERROR;
    }
  };

  setCarrierFilter = (value: Carrier | undefined): void => {
    this.carrierFilter = value;
  };

  setStatusFilter = (value: UserStatus): void => {
    this.statusFilter = value;
  };
}

export default UsersModel;
