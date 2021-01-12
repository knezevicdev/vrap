/* eslint-disable @typescript-eslint/camelcase */
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

class EmailCaptureCardViewModel {
  readonly email: string = '';
  readonly setEmail: (value: string) => void;
  readonly fordImg = `${publicRuntimeConfig.BASE_PATH}/components/Ford10Percent.png`;

  constructor(email: string, setEmail: (value: string) => void) {
    this.email = email;
    this.setEmail = setEmail;
  }

  getInputValue = (): string => {
    return this.email;
  };

  onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.setEmail(value);
  };
}

export default EmailCaptureCardViewModel;
