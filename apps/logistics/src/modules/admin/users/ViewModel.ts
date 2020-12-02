import UsersModel from './Model';

class UsersViewModel {
  private model: UsersModel;

  constructor(usersModel: UsersModel) {
    this.model = usersModel;
  }

  getUserStatuses(): void {
    this.model.getUserStatuses();
  }
}

export default UsersViewModel;
