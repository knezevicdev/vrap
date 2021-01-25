import UsersModel from './Model';

class UsersViewModel {
  private model: UsersModel;

  constructor(usersModel: UsersModel) {
    this.model = usersModel;
  }

  init(): void {
    this.model.getUserStatuses();
    this.model.getCarriers();
    this.model.getUsers();
  }
}

export default UsersViewModel;
