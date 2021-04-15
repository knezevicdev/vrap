import { makeAutoObservable, runInAction } from 'mobx';

import { forgotPassword, Status } from 'src/networking/Networker';

class ForgotModel {
  status = Status.INITIAL;
  errorMessage = '';

  constructor() {
    makeAutoObservable(this);
  }

  forgotPassword = async (email: string): Promise<void> => {
    this.status = Status.FETCHING;
    this.errorMessage = '';
    try {
      await forgotPassword({ email });
      runInAction(() => {
        this.status = Status.SUCCESS;
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this.status = Status.ERROR;
        this.errorMessage =
          err.message ?? 'There was an error with your request';
      });
    }
  };
}

export default ForgotModel;
