import { makeAutoObservable, runInAction } from 'mobx';

import { forgotPassword, Status } from 'src/networking/Networker';

class ForgotModel {
  status = Status.INITIAL;

  constructor() {
    makeAutoObservable(this);
  }

  forgotPassword = async (email: string): Promise<void> => {
    try {
      await forgotPassword({ email });
      runInAction(() => {
        this.status = Status.SUCCESS;
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this.status = Status.ERROR;
      });
    }
  };
}

export default ForgotModel;
