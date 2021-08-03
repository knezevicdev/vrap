interface FooterLink {
  title: string;
  href: string;
}

class SimpleFooterModel {
  readonly copyRightMessage: string = '©2021 VROOM. ALL RIGHTS RESERVED.';

  get getSectionLink(): FooterLink[] {
    return [
      {
        title: 'PRIVACY',
        href: '/legal/privacy-policy',
      },
      {
        title: 'TERMS',
        href: '/legal/terms-of-use',
      },
      {
        title: 'CONTACT',
        href: '/contact',
      },
    ];
  }
}

export default SimpleFooterModel;
