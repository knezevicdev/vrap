import { makeAutoObservable, runInAction } from 'mobx';

import {
  Carrier,
  Status as UserStatus,
  User,
} from 'src/networking/models/User';
import {
  getCarriers,
  getUsers,
  getUserStatuses,
  patchUser,
  postCreateAccountEmail,
  Status,
} from 'src/networking/Networker';

class UsersModel {
  users: User[] = [];
  usersStatus: Status = Status.INITIAL;

  carrierFilter = '';
  statusFilter = UserStatus.Pending;
  statusOptions: string[] = [];
  statusOptionsStatus: Status = Status.INITIAL;

  carrierOptions: Carrier[] = [];
  carrierOptionsStatus: Status = Status.INITIAL;

  createAccountStatus: Status = Status.INITIAL;

  constructor() {
    makeAutoObservable(this);
  }

  getUsers = async (): Promise<void> => {
    this.usersStatus = Status.FETCHING;

    try {
      const response = await getUsers(
        this.carrierFilter || '',
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
      runInAction(() => {
        this.getUsers();
      });
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

  getCarriers = async (): Promise<void> => {
    this.carrierOptionsStatus = Status.FETCHING;
    try {
      const response = await getCarriers({ filter: '', portalVisible: true });
      runInAction(() => {
        this.carrierOptionsStatus = Status.SUCCESS;
        this.carrierOptions = response.data.carriers;
      });
    } catch (err) {
      console.error(err);
      this.carrierOptionsStatus = Status.ERROR;
    }
  };

  postCreateAccount = async (emailAddress: string): Promise<void> => {
    this.createAccountStatus = Status.FETCHING;
    try {
      await postCreateAccountEmail({
        emailAddress,
        signupUrl: `${window.location.origin}/signup`,
      });
      runInAction(() => {
        this.createAccountStatus = Status.SUCCESS;
      });
    } catch (err) {
      console.error(err);
      this.createAccountStatus = Status.ERROR;
    }
  };

  setCarrierFilter = (value: string): void => {
    this.carrierFilter = value;
  };

  setStatusFilter = (value: UserStatus): void => {
    this.statusFilter = value;
  };
}

export default UsersModel;
