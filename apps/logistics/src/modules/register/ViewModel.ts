import RegisterModel from './Model';

class RegisterViewModel {
  private model: RegisterModel;

  constructor(usersModel: RegisterModel) {
    this.model = usersModel;
  }

  getEmail(): string {
    return this.model.email;
  }
}

export default RegisterViewModel;
