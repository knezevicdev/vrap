import Cookie from 'js-cookie';
import { makeAutoObservable, runInAction } from 'mobx';

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
      const config: Cookie.CookieAttributes = {
        expires: new Date(data.exp * 1000),
        sameSite: 'strict',
      };
      if (process.env.NODE_ENV !== 'development') {
        config.secure = true;
      }
      Cookie.set('authData', data, config);
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
