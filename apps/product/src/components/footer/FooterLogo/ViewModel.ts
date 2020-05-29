import { ReactComponent as RocketHomes } from '../../svg/rocket-homes-horizontal-logo.svg';
import { ReactComponent as RocketHQ } from '../../svg/rocket-hq-horizontal-logo.svg';
import { ReactComponent as RocketLoans } from '../../svg/rocket-loans-horizontal-logo.svg';
import { ReactComponent as RocketMortgage } from '../../svg/rocket-mortgage-horizontal-logo.svg';

export interface IconLink {
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  height: number;
  text: string;
  href: string;
}

class FooterLogoViewModel {
  readonly title: string = 'Our Sister Companies';
  readonly links: IconLink[] = [
    {
      Icon: RocketMortgage,
      height: 33,
      text: 'Learn more about which mortgage might be right for you.',
      href: 'https://www.rocketmortgage.com/',
    },
    {
      Icon: RocketLoans,
      height: 14,
      text: 'Personal loans that help you manage debt, or plan for the future.',
      href: 'https://www.rocketloans.com/',
    },
    {
      Icon: RocketHomes,
      height: 14,
      text:
        'Browse through thousands of high quality home listings in your area.',
      href:
        'https://protect-us.mimecast.com/s/dU-lCG6E9ku1pXg9F7iCI4?domain=rockethomes.com/',
    },
    {
      Icon: RocketHQ,
      height: 14,
      text: 'Loan repayment and global account options.',
      href: 'https://www.rockethq.com/',
    },
  ];
}

export default FooterLogoViewModel;
