import UsersModel from 'src/modules/admin/users/Model';

class CreateAccountViewModel {
  private usersModel: UsersModel;

  constructor(usersModel: UsersModel) {
    this.usersModel = usersModel;
  }

  createAccount(value: string): void {
    this.usersModel.postCreateAccount(value);
  }
}

export default CreateAccountViewModel;
