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
        expires: 1,
        sameSite: 'strict',
        secure: true,
      };
      Cookie.set('accessToken', data.accessToken, config);
      Cookie.set('idToken', data.idToken, config);
      Cookie.set('refreshToken', data.refreshToken, config);
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
