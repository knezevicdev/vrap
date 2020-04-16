import { ReactComponent as PhoneIcon } from '../svg/phone.svg';

interface Link {
  href: string;
  label: string;
  MobileIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

class HeaderNavViewModel {
  contactUsLink(): Link {
    return {
      href: '/contact-us',
      label: 'Contact Us',
      MobileIcon: PhoneIcon,
    };
  }
}

export default HeaderNavViewModel;
