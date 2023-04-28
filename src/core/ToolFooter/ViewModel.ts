import { CatData } from '@vroom-web/cat-sdk';

class FooterViewModel {
  private readonly catData: CatData | undefined;

  constructor(catData?: CatData) {
    this.catData = catData;
  }

  private getSitePhoneNumber = (): undefined | string => {
    if (!this.catData) {
      return undefined;
    }
    return this.catData.sitePhoneNumber;
  };

  private getPhoneNumber = (): { name: string; href: string } => {
    const sitePhoneNumber = this.getSitePhoneNumber();

    const defaultNumber = {
      name: '(855) 524-1300',
      href: 'tel:+18555241300',
    };

    if (sitePhoneNumber) {
      const space = '%20';
      const nonNumber = /[^0-9]/g;
      const name = sitePhoneNumber.replace(space, ' ');
      const href = 'tel:+' + name.replace(nonNumber, '');

      return {
        name: name,
        href: href,
      };
    }

    return defaultNumber;
  };

  readonly phoneNumber = this.getPhoneNumber();
}

export default FooterViewModel;
