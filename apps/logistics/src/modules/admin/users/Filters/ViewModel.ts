import UsersModel from 'src/modules/admin/users/Model';
import { Status as UserStatus } from 'src/networking/models/User';

class FiltersViewModel {
  private usersModel: UsersModel;

  constructor(usersModel: UsersModel) {
    this.usersModel = usersModel;
  }

  get carrierOptions(): { key: string; label: string }[] {
    return this.usersModel.carrierOptions.map((i) => ({
      key: i.carrier_code,
      label: i.carrier,
    }));
  }

  get carrierFilter(): string {
    return this.usersModel.carrierFilter;
  }

  setCarrierFilter(value: string): void {
    this.usersModel.setCarrierFilter(value);
    this.usersModel.getUsers();
  }

  get statusOptions(): { key: string; label: string }[] {
    return this.usersModel.statusOptions.map((i) => ({
      key: i,
      label: `${i.charAt(0).toUpperCase()}${i.slice(1)}`,
    }));
  }

  get statusFilter(): string {
    return this.usersModel.statusFilter || '';
  }

  setStatusFilter(value: UserStatus): void {
    this.usersModel.setStatusFilter(value);
    this.usersModel.getUsers();
  }
}

export default FiltersViewModel;
