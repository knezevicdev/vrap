import UserStatusModel from './Model';

import UsersModel from 'src/modules/admin/users/Model';

class UserStatusViewModel {
  private model: UserStatusModel;
  private usersModel: UsersModel;

  constructor(userStatusModel: UserStatusModel, usersModel: UsersModel) {
    this.model = userStatusModel;
    this.usersModel = usersModel;
  }

  getUserStatuses(): void {
    this.model.getUserStatuses();
  }

  get options(): { key: string; label: string }[] {
    return this.model.options.map((i) => ({
      key: i,
      label: `${i.charAt(0).toUpperCase()}${i.slice(1)}`,
    }));
  }

  get value(): string {
    return this.usersModel.statusFilter || '';
  }

  setValue(value: string): void {
    this.model.setValue(value);
  }

  setStatusFilterAndFilter(value: string): void {
    this.usersModel.setStatusFilter(value);
    this.usersModel.getUsers();
  }
}

export default UserStatusViewModel;
