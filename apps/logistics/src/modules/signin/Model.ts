import { makeAutoObservable, runInAction } from 'mobx';

import { setAuthDataCookie } from 'src/components/Auth';
import { postSignIn, Status } from 'src/networking/Networker';

class SignInModel {
  status = Status.INITIAL;
  errorMessage = '';
  previousUrl = '/';

  constructor(previousUrl?: string) {
    if (previousUrl) {
      this.previousUrl = previousUrl;
    }
    makeAutoObservable(this, {
      previousUrl: false,
    });
  }

  authenticate = async (email: string, password: string): Promise<void> => {
    this.status = Status.FETCHING;
    this.errorMessage = '';
    try {
      const { data } = await postSignIn(email, password);
      setAuthDataCookie(data);
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

  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }
}

export default SignInModel;
