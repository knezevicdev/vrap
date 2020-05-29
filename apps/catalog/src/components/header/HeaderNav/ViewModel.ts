import Router from 'next/router';

import { ReactComponent as PhoneIcon } from 'src/components/svg/phone.svg';

interface Link {
  href: string;
  label: string;
  MobileIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

class HeaderNavViewModel {
  readonly ctaLabel: string = 'Shop Now';

  handleButtonClick(): void {
    Router.push('/cars');
  }

  contactUsLink(): Link {
    return {
      href: '/contact-us',
      label: 'Get Help',
      MobileIcon: PhoneIcon,
    };
  }
}

export default HeaderNavViewModel;
