import { makeAutoObservable, runInAction } from 'mobx';

import { setAuthDataCookie } from 'src/components/Auth';
import { postSignIn, Status } from 'src/networking/Networker';

class SignInModel {
  status = Status.INITIAL;
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
      });
    }
  };
}

export default SignInModel;
