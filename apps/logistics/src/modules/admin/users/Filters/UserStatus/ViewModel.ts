import UsersModel from 'src/modules/admin/users/Model';
import { Status as UserStatus } from 'src/networking/models/User';

class UserStatusViewModel {
  private usersModel: UsersModel;

  constructor(usersModel: UsersModel) {
    this.usersModel = usersModel;
  }

  get options(): { key: string; label: string }[] {
    if (this.usersModel.statusOptions.length > 0) {
      return this.usersModel.statusOptions.map((i) => ({
        key: i,
        label: `${i.charAt(0).toUpperCase()}${i.slice(1)}`,
      }));
    } else {
      return [];
    }
  }

  get storedValue(): string {
    return this.usersModel.statusFilter || '';
  }

  setStatusFilterAndFilter(value: UserStatus): void {
    this.usersModel.setStatusFilter(value);
    this.usersModel.getUsers();
  }
}

export default UserStatusViewModel;
